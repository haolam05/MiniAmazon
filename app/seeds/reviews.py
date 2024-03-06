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
        },
        {
            "product_id": product_image_name_to_ids["lego.jpg"],
            "customer_id": username_to_ids["mihawk"],
            "review": "Very nice lego! My daughter loves it 🎉",
            "rating": 5
        },
        {
            "product_id": product_image_name_to_ids["lego.jpg"],
            "customer_id": username_to_ids["robin"],
            "review": "Awesome, would be better if comes in a nicer package. Also, why does my package does not come with the balloon?",
            "rating": 4
        },
        {
            "product_id": product_image_name_to_ids["lego.jpg"],
            "customer_id": username_to_ids["zoro"],
            "review": "I only have the orange balloon!!! Is this a scam? Send me another one!",
            "rating": 1
        },
        {
            "product_id": product_image_name_to_ids["chess.jpg"],
            "customer_id": username_to_ids["sanji"],
            "review": "Pretty cool board, but I don't really like the pieces. Do you have a different color other than black and white?",
            "rating": 4
        },
        {
            "product_id": product_image_name_to_ids["chess.jpg"],
            "customer_id": username_to_ids["robin"],
            "review": "I got better at chess after I bought this! 😂",
            "rating": 5
        },
        {
            "product_id": product_image_name_to_ids["chess.jpg"],
            "customer_id": username_to_ids["haolam"],
            "review": "The material has high quality. Highly recommended!! ♟️♟️",
            "rating": 5
        },
        {
            "product_id": product_image_name_to_ids["watch-men.jpg"],
            "customer_id": username_to_ids["haolam"],
            "review": "Love the fancy design. Let me know when there is a discount 🙂",
            "rating": 4
        },
        {
            "product_id": product_image_name_to_ids["watch-men.jpg"],
            "customer_id": username_to_ids["sanji"],
            "review": "It's too bright and it hurts my eyes 👀",
            "rating": 3
        },
        {
            "product_id": product_image_name_to_ids["watch-men.jpg"],
            "customer_id": username_to_ids["robin"],
            "review": "Too pricey... 💸💸",
            "rating": 4
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
