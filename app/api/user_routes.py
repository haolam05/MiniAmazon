from flask import Blueprint
from flask_login import login_required
from app.models import Customer, OrderItem

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
def user_reviews(id):
    """Get all reviews belonged to a customer by id"""
    customer = Customer.query.get(id)

    if not customer:
        return {"message": "User couldn't be found"}, 404

    reviews = [review.to_dict() for review in customer.reviews]

    return reviews, 200


@user_routes.route('/<int:id>/bookmarks')
@login_required
def user_bookmarks(id):
    """Get all bookmarks belonged to a customer by id"""
    customer = Customer.query.get(id)

    if not customer:
        return {"message": "User couldn't be found"}, 404

    bookmarks = [bookmark.to_dict() for bookmark in customer.bookmarks]

    return bookmarks, 200


@user_routes.route('/<int:id>/orders')
@login_required
def user_orders(id):
    """Get all orders belonged to a customer by id. Past orders are indicated via the is_checkout attribute. Current order includes all items in the cart. There should be no more than 1 current_order at any time"""
    customer = Customer.query.get(id)

    if not customer:
        return {"message": "User couldn't be found"}, 404

    orders = [order.to_dict() for order in customer.orders]

    return orders, 200
