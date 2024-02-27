from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Customer

customer_routes = Blueprint('customers', __name__)


@customer_routes.route('/')
@login_required
def customers():
    """Query for all customers and returns them in a list of customer dictionaries"""
    customers = Customer.query.all()
    return {'customers': [customer.to_dict() for customer in customers]}


@customer_routes.route('/<int:id>')
@login_required
def customer(id):
    """Query for a customer by id and returns that customer in a dictionary"""
    customer = Customer.query.get(id)
    return customer.to_dict()
