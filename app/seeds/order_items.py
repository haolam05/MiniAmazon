from app.models import db, environment, SCHEMA, Product, OrderItem
from sqlalchemy.sql import text


def seed_order_items():
    product_image_name_to_ids = Product.product_image_to_ids()

    order_items = [
        {
            "product_id": product_image_name_to_ids["avocado.jpg"],
            "order_id": 1,
            "quantity": 4
        }
    ]

    [db.session.add(OrderItem(**order_item)) for order_item in order_items]
    db.session.commit()


def undo_order_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_items"))

    db.session.commit()
