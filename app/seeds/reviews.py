from app.models import db, environment, SCHEMA, Customer, Product, Review
from sqlalchemy.sql import text


def seed_reviews():
    username_to_ids = Customer.username_to_ids()
    product_image_name_to_ids = Product.product_image_to_ids()

    reviews = [
        {
            "product_id": product_image_name_to_ids["avocado.jpg"],
            "customer_id": username_to_ids["luffy"],
            "review": "Delicious avocado!!!",
            "rating": 5
        },
        {
            "product_id": product_image_name_to_ids["avocado.jpg"],
            "customer_id": username_to_ids["zoro"],
            "review": "I enjoy this very much. Awesome quality.",
            "rating": 5
        },
        {
            "product_id": product_image_name_to_ids["avocado.jpg"],
            "customer_id": username_to_ids["sanji"],
            "review": "Not bad!",
            "rating": 4
        },
        {
            "product_id": product_image_name_to_ids["avocado.jpg"],
            "customer_id": username_to_ids["robin"],
            "review": "I eat avocado every day for breakfast, lunch and dinner :)",
            "rating": 4
        },
        {
            "product_id": product_image_name_to_ids["avocado.jpg"],
            "customer_id": username_to_ids["mihawk"],
            "review": "Say less. Highly recommended",
            "rating": 5
        },
        {
            "product_id": product_image_name_to_ids["avocado.jpg"],
            "customer_id": username_to_ids["acee"],
            "review": "My avocado got lost :(",
            "rating": 2
        },
        {
            "product_id": product_image_name_to_ids["puzzle.jpg"],
            "customer_id": username_to_ids["luffy"],
            "review": "My daughter loves this.",
            "rating": 5
        },
        {
            "product_id": product_image_name_to_ids["puzzle.jpg"],
            "customer_id": username_to_ids["robin"],
            "review": "The puzzle is too hard. I can't even solve it. My son is having a hard time...",
            "rating": 1
        },
        {
            "product_id": product_image_name_to_ids["puzzle.jpg"],
            "customer_id": username_to_ids["mihawk"],
            "review": "Could have come in a better package!",
            "rating": 3
        }
    ]

    [db.session.add(Review(**review)) for review in reviews]
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
