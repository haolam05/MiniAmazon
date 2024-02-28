from app.models import db, environment, SCHEMA, Order
from sqlalchemy.sql import text


def seed_orders():

    orders = [
    ]

    [db.session.add(Order(**order)) for order in orders]
    db.session.commit()


def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
