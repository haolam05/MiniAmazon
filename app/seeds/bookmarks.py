from app.models import db, environment, SCHEMA, Customer, Product, Bookmark
from sqlalchemy.sql import text


def seed_bookmarks():
    username_to_ids = Customer.username_to_ids()
    product_image_name_to_ids = Product.product_image_to_ids()

    bookmarks = [
        {
            "product_id": product_image_name_to_ids["digital-microscope.jpg"],
            "customer_id": username_to_ids["haolam"],
            "note": "This seems reasonable. Looking to see if there is a better deal."
        },
        {
            "product_id": product_image_name_to_ids["camera.jpg"],
            "customer_id": username_to_ids["haolam"],
            "note": "Too expensive. Waiting for a sale."
        },
        {
            "product_id": product_image_name_to_ids["book-python-bible.jpg"],
            "customer_id": username_to_ids["haolam"],
            "note": "Great advertisement. Is this really a bible? Researching for more information before buying."
        },
        {
            "product_id": product_image_name_to_ids["book-java.jpg"],
            "customer_id": username_to_ids["haolam"],
            "note": "Considering which language to learn. Java book is too expensive compared to python book."
        },
        {
            "product_id": product_image_name_to_ids["eyedrop.png"],
            "customer_id": username_to_ids["haolam"],
            "note": "Coding too much, needs eyedrop. Looking for a larger pack."
        }
    ]

    [db.session.add(Bookmark(**bookmark)) for bookmark in bookmarks]
    db.session.commit()


def undo_bookmarks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookmarks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookmarks"))

    db.session.commit()
