from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Bookmark(db.Model):
    __tablename__ = "bookmarks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    note = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("customers.id")), nullable=False)


    """ one-to-many """
    product = db.relationship("Product", back_populates="bookmarks")
    customer = db.relationship("Customer", back_populates="bookmarks")


    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "customer_id": self.customer_id,
            "note": self.note,
            "created_at": str(self.created_at.strftime("%Y-%m-%d %H:%M:%S")),
        }
