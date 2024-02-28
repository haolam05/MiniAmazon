from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import db, Product
from app.forms import ProductForm
from .aws_helpers import upload_file_to_s3, get_unique_filename

product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def products():
    """Returns a list of all products"""
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}


@product_routes.route('/<int:id>')
@login_required
def product(id):
    """Returns a product specified by id"""
    product = Product.query.get(id)
    if not product:
        return {"message": "Product couldn't be found"}, 404
    return product.to_dict()


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


# @product_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def update_product(id):
#     """Update an exisiting product by id"""
#     form = ProductForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]

#     if form.validate_on_submit():
#         product = Product.query.get(id)
#         image = form.data["product_image"]
#         url = None

#         if not product:
#             return {"message": "Product couldn't be found"}, 404

#         if image:
#             image.filename = get_unique_filename(image.filename)
#             upload = upload_file_to_s3(image)
#             if "url" not in upload:
#                 return {"product_image": "Image upload fail. Please try again later."}, 500
#             url = upload["url"]

#         product.name = form.data["name"],
#         product.category = form.data["category"],
#         product.description = form.data["description"],
#         product.price = form.data["price"],
#         product.remaining = form.data["remaining"],
#         product.product_image = url

#         db.session.commit()

#         return product.to_dict(), 200

#     return form.errors, 400


@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    """Delete a product by id"""
    product = Product.query.get(id)

    if not product:
        return {"message": "Product couldn't be found"}, 404

    if product.seller_id != current_user.id:
        return redirect("/api/auth/forbidden")

    db.session.delete(product)
    db.session.commit()

    return {"message": "Successfully deleted product"}, 200