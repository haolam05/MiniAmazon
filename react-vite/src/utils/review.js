export const getAverageRating = ratings => {
  if (ratings.length === 0) return "0.00";
  return (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(2);
}

export const toggleReviewInfo = () => {
  const reviewInfo = document.querySelector("#product-details .review-info");
  const productReviewInfo = document.querySelector("#product-details .product-review-info");
  if (reviewInfo) {
    if (reviewInfo.classList.contains("hidden")) {
      reviewInfo.classList.remove("hidden");
      if (productReviewInfo) productReviewInfo.style.width = 'fit-content';
    } else {
      reviewInfo.classList.add("hidden");
      if (productReviewInfo) {
        productReviewInfo.style.width = '0';
      }
    }
  }
}

export const showEditReviewForm = reviewId => {
  const review = document.querySelector(`#product-review-${reviewId}`);
  if (review) {
    const productReviewText = review.querySelector(".product-review-text");
    const textarea = review.querySelector(".review-textarea");
    if (textarea) textarea.classList.remove("hidden");
    if (productReviewText) productReviewText.classList.add("hidden");
  }
}

export const hideEditReviewForm = reviewId => {
  const review = document.querySelector(`#product-review-${reviewId}`);
  if (review) {
    const productReviewText = review.querySelector(".product-review-text");
    const textarea = review.querySelector(".review-textarea");
    const rating = review.querySelector(".rating");
    if (textarea) textarea.classList.add("hidden");
    if (productReviewText) productReviewText.classList.remove("hidden");
  }
}
