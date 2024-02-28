from app.models import db, environment, SCHEMA, Bookmark
from sqlalchemy.sql import text


def seed_bookmarks():

    bookmarks = [
    ]

    [db.session.add(Bookmark(**bookmark)) for bookmark in bookmarks]
    db.session.commit()


def undo_bookmarks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookmarks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookmarks"))

    db.session.commit()
