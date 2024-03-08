from gevent import monkey
monkey.patch_all()

import os
from flask import Flask, request, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from flask_login import LoginManager
from .models import db, Customer
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.product_routes import product_routes
from .api.review_routes import review_routes
from .api.bookmark_routes import bookmark_routes
from .api.order_routes import order_routes
from .api.message_routes import message_routes
from .api.aws_routes import aws_routes
from .seeds import seed_commands
from .config import Config
from .socket import socketio


app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')


login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return Customer.query.get(int(id))



app.cli.add_command(seed_commands)
app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(product_routes, url_prefix='/api/products')
app.register_blueprint(review_routes, url_prefix='/api/reviews')
app.register_blueprint(bookmark_routes, url_prefix='/api/bookmarks')
app.register_blueprint(order_routes, url_prefix='/api/orders')
app.register_blueprint(message_routes, url_prefix='/api/messages')
app.register_blueprint(aws_routes, url_prefix='/api/aws')
db.init_app(app)
Migrate(app, db)
socketio.init_app(app, async_mode='gevent')


CORS(app)


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """Serving Routes Docs"""
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """Serving static files"""
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    """Page Not Found"""
    return app.send_static_file('index.html')
