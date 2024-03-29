from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .product import Product


class Order(db.Model):
    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    is_checkout = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    customer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("customers.id")), nullable=False)


    """ one-to-many """
    customer = db.relationship("Customer", back_populates="orders")
    order_items = db.relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


    def to_dict(self):
        items = []

        for item in self.order_items:
            if self.is_checkout == False:
                product = Product.query.get(item.product_id)
                if product.remaining > 0:
                    items.append(item.to_dict())
            else:
                items.append(item.to_dict())

        return {
            "id": self.id,
            "customer_id": self.customer_id,
            "is_checkout": self.is_checkout,
            "created_at": str(self.created_at.strftime("%Y-%m-%d %H:%M:%S")),
            "updated_at": str(self.updated_at.strftime("%Y-%m-%d %H:%M:%S")),
            "items": items
        }
