from flask import Blueprint, redirect
from flask_login import login_required, current_user
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
def user_reviews(id):
    """Get all reviews belonged to a customer by id"""
    customer = Customer.query.get(id)

    if not customer:
        return {"message": "User couldn't be found"}, 404

    if customer.id != current_user.id:
        return redirect("/api/auth/forbidden")

    reviews = [review.to_dict() for review in customer.reviews]

    return reviews, 200


@user_routes.route('/<int:id>/bookmarks')
@login_required
def user_bookmarks(id):
    """Get all bookmarks belonged to a customer by id"""
    customer = Customer.query.get(id)

    if not customer:
        return {"message": "User couldn't be found"}, 404

    if customer.id != current_user.id:
        return redirect("/api/auth/forbidden")

    bookmarks = [bookmark.to_dict() for bookmark in customer.bookmarks]

    return bookmarks, 200
