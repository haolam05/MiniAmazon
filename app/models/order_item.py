from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class OrderItem(db.Model):
    __tablename__ = "order_items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")), nullable=False)


    """ one-to-many """
    product = db.relationship("Product", back_populates="order_items")
    order = db.relationship("Order", back_populates="order_items")


    def to_dict(self):
        return {
            "id": self.id,
            "customer_id": self.customer_id,
            "is_checkout": self.is_checkout,
            "created_at": str(self.created_at)
        }
