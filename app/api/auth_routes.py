from flask import Blueprint, request
from app.models import Customer, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """Authenticates a customer."""
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """Logs a customer in"""
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        customer = Customer.query.filter(Customer.email == form.data['email']).first()
        login_user(customer)
        return customer.to_dict()

    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """Logs a customer out"""
    logout_user()
    return {'message': 'Customer logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """Creates a new customer and logs them in"""
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        customer = Customer(
            customername=form.data['customername'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(customer)
        db.session.commit()
        login_user(customer)
        return customer.to_dict()
    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """Returns unauthorized JSON when flask-login authentication fails"""
    return {'errors': {'message': 'Unauthorized'}}, 401
