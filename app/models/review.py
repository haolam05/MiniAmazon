from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("customers.id")), nullable=False)


    """ one-to-many """
    product = db.relationship("Product", back_populates="reviews")
    customer = db.relationship("Customer", back_populates="reviews")


    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "customer_id": self.customer_id,
            "review": self.review,
            "rating": self.rating,
            "created_at": str(self.created_at)
        }
