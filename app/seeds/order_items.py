from app.models import db, environment, SCHEMA, Product, OrderItem
from sqlalchemy.sql import text


def seed_order_items():
    product_image_name_to_ids = Product.product_image_to_ids()

    order_items = [
        {
            "product_id": product_image_name_to_ids["avocado.jpg"],
            "order_id": 5,
            "quantity": 2
        },
        {
            "product_id": product_image_name_to_ids["black-berries.jpg"],
            "order_id": 5,
            "quantity": 1
        },
        {
            "product_id": product_image_name_to_ids["ship.jpg"],
            "order_id": 5,
            "quantity": 3
        },
        {
            "product_id": product_image_name_to_ids["raspberries.jpg"],
            "order_id": 1,
            "quantity": 4
        },
        {
            "product_id": product_image_name_to_ids["avocado.jpg"],
            "order_id": 1,
            "quantity": 1
        },
        {
            "product_id": product_image_name_to_ids["puppet.jpg"],
            "order_id": 1,
            "quantity": 3
        },
        {
            "product_id": product_image_name_to_ids["puzzle.jpg"],
            "order_id": 1,
            "quantity": 2
        },
        {
            "product_id": product_image_name_to_ids["water-flosser.jpg"],
            "order_id": 2,
            "quantity": 1
        },
        {
            "product_id": product_image_name_to_ids["puppet.jpg"],
            "order_id": 2,
            "quantity": 4
        },
        {
            "product_id": product_image_name_to_ids["hair-dryer.jpg"],
            "order_id": 2,
            "quantity": 3
        },
        {
            "product_id": product_image_name_to_ids["ship.jpg"],
            "order_id": 2,
            "quantity": 4
        },
        {
            "product_id": product_image_name_to_ids["ship.jpg"],
            "order_id": 3,
            "quantity": 1
        },
        {
            "product_id": product_image_name_to_ids["avocado.jpg"],
            "order_id": 3,
            "quantity": 1
        },
        {
            "product_id": product_image_name_to_ids["raspberries.jpg"],
            "order_id": 3,
            "quantity": 1
        },
        {
            "product_id": product_image_name_to_ids["black-berries.jpg"],
            "order_id": 4,
            "quantity": 1
        },
        {
            "product_id": product_image_name_to_ids["book-blood-money.jpg"],
            "order_id": 4,
            "quantity": 1
        },
        {
            "product_id": product_image_name_to_ids["raspberries.jpg"],
            "order_id": 4,
            "quantity": 1
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
