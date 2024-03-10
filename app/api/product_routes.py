from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import db, Product, Review, Bookmark
from app.forms import ProductForm, ReviewForm, BookmarkForm
from .aws_helpers import upload_file_to_s3, get_unique_filename
from ..socket import socketio

product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def products():
    """Returns a list of all products"""
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}, 200


@product_routes.route('/<int:id>')
@login_required
def product(id):
    """Returns a product specified by id"""
    product = Product.query.get(id)
    if not product:
        return {"message": "Product couldn't be found"}, 404
    return product.to_dict(), 200


@product_routes.route('/', methods=['POST'])
@login_required
def create_product():
    """Create a new product"""
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image = form.data["product_image"]
        url = None

        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return {"product_image": "Image upload fail. Please try again later."}, 500
            url = upload["url"]

        new_product = Product(
            name=form.data["name"],
            category=form.data["category"],
            description=form.data["description"],
            price=form.data["price"],
            seller_id=current_user.id,
            remaining=form.data["remaining"],
            product_image=url
        )

        db.session.add(new_product)
        db.session.commit()

        return new_product.to_dict(), 201

    return form.errors, 400


@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_product(id):
    """Update an exisiting product by id"""
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        product = Product.query.get(id)
        image = form.data["product_image"]
        url = None

        if not product:
            return {"message": "Product couldn't be found"}, 404

        if product.seller_id != current_user.id:
            return redirect("/api/auth/forbidden")

        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return {"product_image": "Image upload fail. Please try again later."}, 500
            url = upload["url"]

        product.name = form.data["name"]
        product.category = form.data["category"]
        product.description = form.data["description"]
        product.price = form.data["price"]
        product.remaining = form.data["remaining"]
        if url != None:
            product.product_image = url

        db.session.commit()
        socketio.emit("product_update", {"product_owner_id": current_user.id, "product": {**product.to_dict()}})
        return product.to_dict(), 200

    return form.errors, 400


@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    """Delete a product by id"""
    product = Product.query.get(id)

    if not product:
        return {"message": "Product couldn't be found"}, 404

    if product.seller_id != current_user.id:
        return redirect("/api/auth/forbidden")

    product.is_deleted = True
    socketio.emit("product_delete", {"product_owner_id": current_user.id, "product_id": product.id, "product_name": product.name})
    db.session.commit()

    return {"message": "Successfully deleted product"}, 200


@product_routes.route('/<int:id>/reviews')
@login_required
def product_reviews(id):
    """Get all reviews belonged to a product by id"""
    product = Product.query.get(id)

    if not product:
        return {"message": "Product couldn't be found"}, 404

    reviews = [review.to_dict() for review in product.reviews]

    return reviews, 200


@product_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def create_product_review(id):
    """Create a new review for a product by id"""
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        product = Product.query.get(id)

        if not product:
            return {"message": "Product couldn't be found"}, 404

        if Review.query.filter(Review.product_id == id).filter(Review.customer_id == current_user.id).one_or_none():
            return {"message": "You already had a review on this product"}, 500

        new_review = Review(
            product_id=id,
            customer_id=current_user.id,
            review=form.data["review"],
            rating=form.data["rating"]
        )

        db.session.add(new_review)
        db.session.commit()

        return {**new_review.to_dict(), "customer": new_review.customer.to_dict()}, 200

    return form.errors, 400


@product_routes.route('/<int:id>/bookmarks')
@login_required
def product_bookmarks(id):
    """Get all bookmarks belonged to a product by id"""
    product = Product.query.get(id)

    if not product:
        return {"message": "product couldn't be found"}, 404

    bookmarks = [bookmark.to_dict() for bookmark in product.bookmarks]

    return bookmarks, 200


@product_routes.route('/<int:id>/bookmarks', methods=['POST'])
@login_required
def create_product_bookmark(id):
    """Create a new bookmark"""
    form = BookmarkForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        product = Product.query.get(id)

        if not product:
            return {"message": "Product couldn't be found"}, 404

        if Bookmark.query.filter(Bookmark.product_id == id).filter(Bookmark.customer_id == current_user.id).one_or_none():
            return {"message": "You already had a bookmark on this product"}, 500

        new_bookmark = Bookmark(
            product_id=id,
            customer_id=current_user.id,
            note=form.data["note"]
        )

        db.session.add(new_bookmark)
        db.session.commit()

        return new_bookmark.to_dict(), 200

    return form.errors, 400
