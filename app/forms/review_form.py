from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


def check_rating(form, field):
    if field.data < 1 or field.data > 5:
        raise ValidationError("Rating must be between 1 and 5")


class ReviewForm(FlaskForm):
    review = StringField("review", validators=[DataRequired()])
    rating = IntegerField("rating", validators=[DataRequired(), check_rating])
