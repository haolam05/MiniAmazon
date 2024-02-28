from app.models import db, environment, SCHEMA, Product
from sqlalchemy.sql import text


def seed_products():

    products = [
    ]

    [db.session.add(Product(**product)) for product in products]
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
