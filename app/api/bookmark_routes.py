from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import db, Bookmark
from app.forms import BookmarkForm


bookmark_routes = Blueprint('bookmarks', __name__)


@bookmark_routes.route('/<int:id>')
@login_required
def bookmark(id):
    """Returns a bookmark specified by id"""
    bookmark = Bookmark.query.get(id)
    if not bookmark:
        return {"message": "bookmark couldn't be found"}, 404
    return bookmark.to_dict(), 200


# @review_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def update_review(id):
#     """Update a review by id"""
#     form = ReviewForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]

#     if form.validate_on_submit():
#         review = Review.query.get(id)

#         if not review:
#             return {"message": "Review couldn't be found"}, 404

#         if review.customer_id != current_user.id:
#             return redirect("/api/auth/forbidden")

#         review.review = form.data["review"]
#         review.rating = form.data["rating"]

#         db.session.commit()

#         return review.to_dict(), 200

#     return form.errors, 400


# @review_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_review(id):
#     """Delete a review by id"""
#     review = Review.query.get(id)

#     if not review:
#         return {"message": "review couldn't be found"}, 404

#     if review.customer_id != current_user.id:
#         return redirect("/api/auth/forbidden")

#     db.session.delete(review)
#     db.session.commit()

#     return {"message": "Successfully deleted review"}, 200
