from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Numeric(10, 2) , nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String, nullable=False)
    remaining = db.Column(db.Integer, nullable=False)
    product_image = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("customers.id")), nullable=False)


    """ one-to-many """
    seller = db.relationship("Customer", back_populates="products")
    reviews = db.relationship("Review", back_populates="product", cascade="all, delete-orphan")
    bookmarks = db.relationship("Bookmark", back_populates="product", cascade="all, delete-orphan")
    order_items = db.relationship("OrderItem", back_populates="product", cascade="all, delete-orphan")


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "category": self.category,
            "description": self.description,
            "seller_id": self.seller_id,
            "remaining": self.remaining,
            "product_image": self.product_image,
            "created_at": str(self.created_at)
        }
