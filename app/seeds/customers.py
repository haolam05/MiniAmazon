from app.models import db, environment, SCHEMA, Customer
from sqlalchemy.sql import text


def seed_customers():
    location = 'https://miniamazon.s3.us-west-2.amazonaws.com/public/'

    customers = [
        {
            "first_name": "Hao",
            "last_name": "Lam",
            "username": "haolam",
            "password": "password",
            "email": "haolam@user.io",
            "profile_image_url": location + "avatar1.png"
        },
        {
            "first_name": "Luffy",
            "last_name": "Monkey D.",
            "username": "luffy",
            "password": "password2",
            "email": "luffy@user.io",
            "profile_image_url": location + "avatar2.png"
        },
        {
            "first_name": "Zoro",
            "last_name": "Roronoa",
            "username": "zoro",
            "password": "password3",
            "email": "zoro@user.io",
            "profile_image_url": location + "avatar3.png"
        },
        {
            "first_name": "Sanji",
            "last_name": "Vinsmoke",
            "username": "sanji",
            "password": "password4",
            "email": "sanji@user.io",
            "profile_image_url": location + "avatar4.png"
        },
                {
            "first_name": "Robin",
            "last_name": "Nico",
            "username": "robin",
            "password": "password5",
            "email": "robin@user.io",
            "profile_image_url": location + "avatar5.png"
        },
        {
            "first_name": "Mihawk",
            "last_name": "Dracule",
            "username": "mihawk",
            "password": "password6",
            "email": "mihawk@user.io",
            "profile_image_url": location + "avatar6.png"
        },
        {
            "first_name": "Ace",
            "last_name": "Portgas D.",
            "username": "acee",
            "password": "password7",
            "email": "ace@user.io",
            "profile_image_url": location + "avatar7.png"
        }
    ]

    [db.session.add(Customer(**customer)) for customer in customers]
    db.session.commit()


def undo_customers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.customers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM customers"))

    db.session.commit()
