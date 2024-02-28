from app.models import db, environment, SCHEMA, Review
from sqlalchemy.sql import text


def seed_reviews():

    reviews = [
    ]

    [db.session.add(Review(**review)) for review in reviews]
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
