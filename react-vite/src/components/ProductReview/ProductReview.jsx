import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSecondaryModal } from "../../context/SecondaryModal";
import { getAvatarUrl } from "../../utils/navbar";
import {
  getAverageRating,
  hideEditReviewForm,
  isInEditMode,
  showEditReviewForm
} from "../../utils/review";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import NotificationModal from "../NotificationModal";
import * as productActions from "../../redux/product";
import "./ProductReview.css";

function ProductReview({ reviews, review, user, setAverageRating }) {
  const dispatch = useDispatch();
  const { setModalContent, closeModal } = useSecondaryModal();
  const [reviewInput, setReviewInput] = useState(review.review);
  const [currentRating, setCurrentRating] = useState(review.rating);
  const [ratingInput, setRatingInput] = useState(review.rating);

  if (!review) return;

  const isMyReview = user.id === review.customer_id;

  const setNewAverageRating = () => {
    const ratings = reviews.filter(r => r.id !== review.id).map(r => r.rating);
    setAverageRating(getAverageRating([...ratings, currentRating]));
  }

  const updateReview = async () => {
    const data = await dispatch(productActions.updateProductReviewThunk(review.product_id, review.id, reviewInput, currentRating));
    if (data?.errors) {
      return setModalContent(
        <NotificationModal
          message={data.errors.message}
          status="modal-errors"
          secondaryModal={true}
        />
      );
    }
    setNewAverageRating();
  }

  const deleteMyReview = async () => {
    const data = await dispatch(productActions.deleteProductReviewThunk(review.product_id, review.id));
    if (data?.errors) {
      setModalContent(
        <NotificationModal
          message={data.errors.message}
          status="modal-errors"
          secondaryModal={true}
        />
      );
    } else {
      setModalContent(
        <NotificationModal
          message="Successfully deleted review"
          status="alert-success"
          secondaryModal={true}
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

  const setStars = e => {
    if (isInEditMode(review.id)) {
      const stars = +e.target.dataset.star;
      setRatingInput(stars);
    }
  }

  const resetStars = () => {
    if (isInEditMode(review.id)) setRatingInput(currentRating);
  }

  const setRating = e => {
    if (isInEditMode(review.id)) {
      const stars = +e.target.dataset.star;
      setCurrentRating(stars);
    }
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
        {<i data-star="1" className={`fa-solid fa-star ${ratingInput > 0 ? "orange" : "gray"}`} onMouseOver={setStars} onMouseOut={resetStars} onClick={setRating}></i>}
        {<i data-star="2" className={`fa-solid fa-star ${ratingInput > 1 ? "orange" : "gray"}`} onMouseOver={setStars} onMouseOut={resetStars} onClick={setRating}></i>}
        {<i data-star="3" className={`fa-solid fa-star ${ratingInput > 2 ? "orange" : "gray"}`} onMouseOver={setStars} onMouseOut={resetStars} onClick={setRating}></i>}
        {<i data-star="4" className={`fa-solid fa-star ${ratingInput > 3 ? "orange" : "gray"}`} onMouseOver={setStars} onMouseOut={resetStars} onClick={setRating}></i>}
        {<i data-star="5" className={`fa-solid fa-star ${ratingInput > 4 ? "orange" : "gray"}`} onMouseOver={setStars} onMouseOut={resetStars} onClick={setRating}></i>}
      </div>
      <div className="review">
        <p className="product-review-text">{reviewInput}</p>
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
              setRatingInput(review.rating);
              setCurrentRating(review.rating);
            }}></i>
            <i className={`fa-solid fa-paper-plane${reviewInput.length ? "" : " disabled"}`} title="Save" onClick={() => {
              if (reviewInput.length) {
                hideEditReviewForm(review.id);
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
