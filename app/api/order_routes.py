from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import db, Order


order_routes = Blueprint('orders', __name__)


@order_routes.route('/<int:id>')
@login_required
def review(id):
    """Returns an order specified by id"""
    order = Order.query.get(id)
    if not order:
        return {"message": "Order couldn't be found"}, 404
    return order.to_dict(), 200
