import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getAvatarUrl } from "../../utils/navbar";
import { hideEditReviewForm, showEditReviewForm } from "../../utils/review";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import NotificationModal from "../NotificationModal";
import * as productActions from "../../redux/product";
import "./ProductReview.css";

function ProductReview({ review, user }) {
  const dispatch = useDispatch();
  const { setModalContent, closeModal } = useModal();
  const [reviewInput, setReviewInput] = useState(review.review);

  if (!review) return;

  const isMyReview = user.id === review.customer_id;

  const updateReview = async () => {
    // const data = await dispatch(productActions.updateProductReviewThunk(review.))
  }

  const deleteMyReview = async () => {
    const data = await dispatch(productActions.deleteProductReviewThunk(review.product_id, review.id));
    if (data?.errors) {
      setModalContent(
        <NotificationModal
          message={data.errors.message}
          status="modal-errors"
        />
      );
    } else {
      setModalContent(
        <NotificationModal
          message="Successfully deleted review"
          status="alert-success"
        />
      );
    }
  }

  const showConfirmDeleteReviewModal = () => {
    setModalContent(
      <ConfirmDeleteModal
        text="Are you sure you want to delete your review?"
        deleteCb={deleteMyReview}
        cancelDeleteCb={closeModal}
      />
    );
  }

  return (
    <div className={`product-review${isMyReview ? " me" : ""}`} id={`product-review-${review.id}`}>
      {isMyReview && (
        <div className="my-reivew-settings">
          <i className="fa-solid fa-gear" title="Edit your review" onClick={() => showEditReviewForm(review.id)}></i>
          <i className="fa-solid fa-trash" title="Delete your review" onClick={showConfirmDeleteReviewModal}></i>
        </div>
      )}
      <div className="customer-image">
        <img src={getAvatarUrl(review.customer.profile_image_url)} alt="reviewer-avatar" />
      </div>
      <div className="review-author">{review.customer.first_name} {review.customer.last_name}</div>
      <div className="rating">
        {<i className={`fa-solid fa-star ${review.rating > 0 ? "orange" : "gray"}`}></i>}
        {<i className={`fa-solid fa-star ${review.rating > 1 ? "orange" : "gray"}`}></i>}
        {<i className={`fa-solid fa-star ${review.rating > 2 ? "orange" : "gray"}`}></i>}
        {<i className={`fa-solid fa-star ${review.rating > 3 ? "orange" : "gray"}`}></i>}
        {<i className={`fa-solid fa-star ${review.rating > 4 ? "orange" : "gray"}`}></i>}
      </div>
      <div className="review">
        <p className="product-review-text">{review.review}</p>
        {isMyReview && (
          <div className="review-textarea hidden">
            <textarea
              type="text"
              spellCheck={false}
              placeholder="Review can not be empty :)"
              value={reviewInput}
              onChange={e => setReviewInput(e.target.value)}
            />
            <i className="fa-solid fa-rectangle-xmark" title="Cancel and close" onClick={() => {
              hideEditReviewForm(review.id);
              setReviewInput(review.review);
            }}></i>
            <i className={`fa-solid fa-paper-plane${reviewInput.length ? "" : " disabled"}`} title="Save" onClick={() => {
              if (reviewInput.length) {
                hideEditReviewForm(review.id);
                setReviewInput(reviewInput);
                updateReview();
              }
            }}></i>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductReview;
