from flask import Blueprint
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
        return {"message": "User couldn't be found"}, 404
    return customer.to_dict()


@user_routes.route('/<int:id>/reviews')
@login_required
def product_reviews(id):
    """Get all reviews belonged to a customer by id"""
    customer = Customer.query.get(id)

    if not customer:
        return {"message": "User couldn't be found"}, 404

    reviews = [review.to_dict() for review in customer.reviews]

    return reviews, 200
