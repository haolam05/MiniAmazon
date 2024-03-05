function ProductReviewInfo({ user, product, toggleReviewInfo, averageRating }) {
  if (user) {
    return (
      <div className="product-review-info" onClick={toggleReviewInfo}>
        <div className="sticker cursor-pointer" title="Click to open/collapse reviews information"></div>
        <div className="review-info cursor-pointer">
          <div className="total-reviews">
            <span>Total reviews ~ {product.reviews.length} 📝</span>
          </div>
          <div className="average-rating">
            <span>Average rating ~ {averageRating} </span>
            <i className={`fa-solid fa-star`}></i>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductReviewInfo;
