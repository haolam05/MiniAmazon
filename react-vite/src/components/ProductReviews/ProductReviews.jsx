import ProductReview from "../ProductReview";
import "./ProductReviews.css";

function ProductReviews({ product, user }) {
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
        <ProductReview key={review.id} review={review} user={user} />
      ))}
    </div>
  );
}

export default ProductReviews;
