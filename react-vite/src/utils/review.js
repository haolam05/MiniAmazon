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
