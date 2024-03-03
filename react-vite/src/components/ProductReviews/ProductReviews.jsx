import ProductReview from "../ProductReview";
import "./ProductReviews.css";

function ProductReviews({ product, user, setAverageRating }) {
  if (!product) return;

  const otherReviews = product.reviews.filter(review => review.customer_id !== user.id);
  const myReview = product.reviews.filter(review => review.customer_id === user.id);

  return (
    <div id="product-reviews">
      {!myReview.length && (
        <div className="new-review-icon" title="Write a review">
          <i className="fa-solid fa-pencil"></i>
        </div>
      )}
      {[...myReview, ...otherReviews].map(review => (
        <ProductReview key={review.id} reviews={product.reviews} review={review} user={user} setAverageRating={setAverageRating} />
      ))}
    </div>
  );
}

export default ProductReviews;
