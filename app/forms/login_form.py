from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Customer


def customer_exists(form, field):
    email = field.data
    customer = Customer.query.filter(customer.email == email).first()
    if not customer:
        raise ValidationError('Email provided not found.')


def password_matches(form, field):
    password = field.data
    email = form.data['email']
    customer = Customer.query.filter(customer.email == email).first()
    if customer and not customer.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), customer_exists])
    password = StringField('Password', validators=[DataRequired(), password_matches])
