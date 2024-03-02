from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


def check_product_id(form, field):
    if field.data < 1:
        raise ValidationError("Product ID must be positive")


def check_quantity(form, field):
    if field.data < 0:
        raise ValidationError("Quantity can not be negative")


class OrderForm(FlaskForm):
    product_id = StringField("product_id", validators=[DataRequired(), check_product_id])
    quantity = IntegerField("product_id", validators=[check_quantity])
