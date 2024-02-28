from flask import Blueprint
from flask_login import login_required
from app.models import Product

product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def products():
    """Returns a list of all products"""
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}


@product_routes.route('/<int:id>')
@login_required
def product(id):
    """Returns a product specified by id"""
    product = Product.query.get(id)
    if not product:
        return {"message": "Product can not be found"}, 404
    return product.to_dict()
