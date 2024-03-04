from flask import Blueprint, request
from app.models import Customer, db
from app.forms import LoginForm, SignUpForm, UpdateUserForm, UpdatePasswordForm
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.security import check_password_hash
from .aws_helpers import upload_file_to_s3, get_unique_filename

auth_routes = Blueprint("auth", __name__)


@auth_routes.route("/")
def authenticate():
    """Get Current User. Returns null if user is not signed in, a dictionary of user info if signed in."""
    if current_user.is_authenticated:
        return {"user": current_user.to_dict()}, 200
    return {"user": None}, 200


@auth_routes.route("/login", methods=["POST"])
def login():
    """Logs a customer in"""
    form = LoginForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        customer = Customer.query.filter(Customer.email == form.data["email"]).first()

        if customer.is_deleted:
            return {"message": "This account has already been deleted"}

        login_user(customer)
        return {"user": customer.to_dict()}, 200

    return form.errors, 401


@auth_routes.route("/logout")
@login_required
def logout():
    """Logs a customer out"""
    logout_user()
    return {"message": "Customer logged out"}, 200


@auth_routes.route("/signup", methods=["POST"])
def sign_up():
    """Signup"""
    form = SignUpForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image = form.data["profile_image_url"]
        url = None
        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return {"profile_image_url": "Image upload fail. Please try again later."}, 500
            url = upload["url"]

        customer = Customer(
            first_name=form.data["first_name"],
            last_name=form.data["last_name"],
            username=form.data["username"],
            email=form.data["email"],
            password=form.data["password"],
            profile_image_url=url
        )

        db.session.add(customer)
        db.session.commit()
        login_user(customer)
        return customer.to_dict(), 200

    return form.errors, 400


@auth_routes.route("/update", methods=["PUT"])
@login_required
def update_user():
    """Update current user information. Returns the updated user."""
    form = UpdateUserForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        user = Customer.query.filter(Customer.email == form.data["email"]).first()

        if not user:
            return { "message": "User couldn't be found" }, 404

        if not check_password_hash(user.password, form.data["password"]):
            return { "password": "Password was incorrect" }, 401

        image = form.data["profile_image_url"]

        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return {"profile_image_url": "Image upload fail. Please try again later."}, 500
            user.profile_image_url = upload["url"]

        user.first_name = form.data["first_name"]
        user.last_name = form.data["last_name"]

        db.session.commit()
        return user.to_dict(), 200

    return form.errors, 400


@auth_routes.route("/password", methods=["PUT"])
@login_required
def update_user_password():
    """Update current user"s password. Required to log in again after success update."""
    form = UpdatePasswordForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        if not check_password_hash(current_user.password, form.data["password"]):
            return { "password": "Password was incorrect" }, 401
        current_user.password = form.data["new_password"]

        db.session.commit()
        logout_user()

        return { "message": "Successfully updated your password. Please log in again." }, 200

    return form.errors, 400


@auth_routes.route("/delete", methods=["DELETE"])
@login_required
def delete_user():
    """Delete current user."""
    current_user.is_deleted = True
    db.session.commit()
    logout_user()
    return { "message": "Successfully deleted account" }, 200


@auth_routes.route("/unauthorized")
def unauthorized():
    """User is not authorized. Please log in."""
    return { "message": "Unauthorized" }, 401


@auth_routes.route("/forbidden")
def forbidden():
    """User is forbbiden to perform this action."""
    return { "message": "Forbidden" }, 403
