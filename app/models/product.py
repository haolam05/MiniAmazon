from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric(10, 2) , nullable=False)
    category = db.Column(db.String(50), nullable=False) # Groceries | Electronics | Books | Beauty & Health | Handmade
    description = db.Column(db.String, nullable=False)
    remaining = db.Column(db.Integer, nullable=False)
    product_image = db.Column(db.String, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("customers.id")), nullable=False)


    """ one-to-many """
    seller = db.relationship("Customer", back_populates="products")
    reviews = db.relationship("Review", back_populates="product", cascade="all, delete-orphan")
    bookmarks = db.relationship("Bookmark", back_populates="product", cascade="all, delete-orphan")
    order_items = db.relationship("OrderItem", back_populates="product", cascade="all, delete-orphan")


    @classmethod
    def product_image_to_ids(cls):
        location = 'https://miniamazon.s3.us-west-2.amazonaws.com/'
        return { product.product_image.split(location)[1]: product.id for product in cls.query.all() }


    @classmethod
    def allowed_categories(cls):
        return ["Groceries", "Electronics", "Books", "Health & Beauty", "Handmade"]


    def to_dict(self):
        reviews = [{**review.to_dict(), "customer": review.customer.to_dict() } for review in self.reviews]

        return {
            "id": self.id,
            "name": self.name,
            "price": str(self.price),
            "category": self.category,
            "description": self.description,
            "seller_id": self.seller_id,
            "remaining": self.remaining,
            "product_image": self.product_image,
            "is_deleted": self.is_deleted,
            "seller": self.seller.to_dict(),
            "created_at": str(self.created_at.strftime("%Y-%m-%d %H:%M:%S")),
            "reviews": reviews
        }
