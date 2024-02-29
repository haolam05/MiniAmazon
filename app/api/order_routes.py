from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import db, Product, Order, OrderItem
from app.forms import OrderForm


order_routes = Blueprint('orders', __name__)


@order_routes.route('/<int:id>')
@login_required
def order(id):
    """Returns an order specified by id"""
    order = Order.query.get(id)

    if not order:
        return {"message": "Order couldn't be found"}, 404

    if order.customer_id != current_user.id:
        return redirect("/api/auth/forbidden")

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


@order_routes.route('/<int:id>', methods=['PUT'])
@login_required
def add_item_to_order(id):
    """Add an item to the current user's order"""
    form = OrderForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        order = Order.query.get(id)
        product = Product.query.get(form.data["product_id"])

        if not order:
            return {"message": "Order couldn't be found"}, 404

        if not product:
            return {"message": "Product couldn't be found"}, 404

        if order.customer_id != current_user.id:
            return redirect("/api/auth/forbidden")

        order_item = OrderItem.query.filter(OrderItem.order_id == order.id).filter(OrderItem.product_id == product.id).one_or_none()
        if not order_item:
            order_item = OrderItem(
                order_id=order.id,
                product_id=form.data["product_id"],
                quantity=form.data["quantity"]
            )
        else:
            order_item.quantity = form.data["quantity"]

        db.session.add(order_item)
        db.session.commit()

        return order_item.to_dict(), 200

    return form.errors, 400


@order_routes.route('/<int:id>/checkout')
@login_required
def checkout_order(id):
    """Checkout an order"""
    order = Order.query.get(id)

    if not order:
        return {"message": "Order couldn't be found"}, 404

    if order.customer_id != current_user.id:
        return redirect("/api/auth/forbidden")

    if order.is_checkout == True:
        return {"message": "This order is already checked out"}, 500

    order.is_checkout = True

    db.session.commit()

    return {"message": "Successfully checked out"}, 200
