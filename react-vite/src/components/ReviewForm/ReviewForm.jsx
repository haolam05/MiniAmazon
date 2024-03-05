import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleReviewOnChange } from "../../utils/form";
import { useSecondaryModal } from "../../context/SecondaryModal";
import { disabledSubmitButton, enabledSubmitButton } from "../../utils/dom";
import NotificationModal from "../NotificationModal";
import * as productActions from "../../redux/product";
import "./ReviewForm.css";

function ReviewForm({ productId }) {
  const dispatch = useDispatch();
  const { setSecondaryModalContent } = useSecondaryModal();
  const [reviewInput, setReviewInput] = useState("");
  const [ratingInput, setRatingInput] = useState(3);
  const [currentRating, setCurrentRating] = useState(3);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    disabledSubmitButton();
    setSubmitting(true);

    const data = await dispatch(productActions.createProductReviewThunk(productId, reviewInput, currentRating));

    if (data?.errors) {
      setSubmitting(false);
      enabledSubmitButton();
      return setErrors(data.errors);
    }

    setSubmitting(false);
    enabledSubmitButton();
    setSecondaryModalContent(
      <NotificationModal
        message="Successfully created review"
        status="alert-success"
        secondaryModal={true}
      />
    );
  }

  const setStars = e => {
    const stars = +e.target.dataset.star;
    setRatingInput(stars);
  }

  const resetStars = () => {
    setRatingInput(currentRating);
  }

  const setRating = e => {
    const stars = +e.target.dataset.star;
    setCurrentRating(stars);
  }


  return (
    <div id="review-form">
      <h2 className="subheading">Write a review</h2>
      <div className="rating">
        {<i data-star="1" className={`fa-solid fa-star ${ratingInput > 0 ? "orange" : "gray"}`} onMouseOver={setStars} onMouseOut={resetStars} onClick={setRating}></i>}
        {<i data-star="2" className={`fa-solid fa-star ${ratingInput > 1 ? "orange" : "gray"}`} onMouseOver={setStars} onMouseOut={resetStars} onClick={setRating}></i>}
        {<i data-star="3" className={`fa-solid fa-star ${ratingInput > 2 ? "orange" : "gray"}`} onMouseOver={setStars} onMouseOut={resetStars} onClick={setRating}></i>}
        {<i data-star="4" className={`fa-solid fa-star ${ratingInput > 3 ? "orange" : "gray"}`} onMouseOver={setStars} onMouseOut={resetStars} onClick={setRating}></i>}
        {<i data-star="5" className={`fa-solid fa-star ${ratingInput > 4 ? "orange" : "gray"}`} onMouseOver={setStars} onMouseOut={resetStars} onClick={setRating}></i>}
      </div>
      <form className="review-form" onSubmit={handleSubmit}>
        <textarea
          spellCheck={false}
          placeholder="Write a review for this product"
          value={reviewInput}
          onChange={e => handleReviewOnChange(e, "review", setReviewInput, setErrors)}
        />
        {errors.review && <p className="modal-errors">{errors.review}</p>}
        {submitting && <div className="loader"></div>}
        <button
          type="submit"
          className={reviewInput.length ? "" : "disabled"}
          disabled={!reviewInput.length}
        >
          Submit
        </button>
      </form>
    </div>
  );
}


export default ReviewForm;
