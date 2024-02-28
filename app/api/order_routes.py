from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import db, Order


order_routes = Blueprint('orders', __name__)


@order_routes.route('/<int:id>')
@login_required
def order(id):
    """Returns an order specified by id"""
    order = Order.query.get(id)
    if not order:
        return {"message": "Order couldn't be found"}, 404
    return order.to_dict(), 200


@order_routes.route('/')
@login_required
def user_orders():
    """Get all orders belonged to the current user. Past orders are indicated via the is_checkout attribute. Current order includes all items in the cart. There should be no more than 1 current_order at any time"""
    orders = [order.to_dict() for order in current_user.orders]
    return orders, 200


@order_routes.route('/', methods=['POST'])
@login_required
def create_order():
    """Create an order for the current user"""
    if any(order.is_checkout == False for order in current_user.orders):
        return {"message": "Please checkout first before creating another order"}, 500

    new_order = Order(customer_id=current_user.id)

    db.session.add(new_order)
    db.session.commit()

    return new_order.to_dict(), 200
