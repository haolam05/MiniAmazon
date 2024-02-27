from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Customer

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def customers():
    """Query for all customers and returns them in a list of customer dictionaries"""
    customers = Customer.query.all()
    return {'customers': [customer.to_dict() for customer in customers]}


@user_routes.route('/<int:id>')
@login_required
def customer(id):
    """Query for a customer by id and returns that customer in a dictionary"""
    customer = Customer.query.get(id)
    if not customer:
        return {"message": "User can not be found"}, 404
    return customer.to_dict()
