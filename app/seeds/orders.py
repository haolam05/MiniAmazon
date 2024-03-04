from app.models import db, environment, SCHEMA, Customer, Order
from sqlalchemy.sql import text


def seed_orders():
    username_to_ids = Customer.username_to_ids()

    orders = [
        {
            "customer_id": username_to_ids["haolam"],
            "is_checkout": True
        },
        {
            "customer_id": username_to_ids["haolam"],
            "is_checkout": True
        },
        {
            "customer_id": username_to_ids["haolam"],
            "is_checkout": True
        },
        {
            "customer_id": username_to_ids["haolam"],
            "is_checkout": True
        },
        {
            "customer_id": username_to_ids["haolam"],
        },
    ]

    [db.session.add(Order(**order)) for order in orders]
    db.session.commit()


def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
