import ProductReview from "../ProductReview";
import "./ProductReviews.css";

function ProductReviews({ product, user }) {
  if (!product) return;

  const userHasWrittenReview = () => {
    return product.reviews.map(review => review.customer_id).includes(user.id);
  }

  return (
    <div id="product-reviews">
      {!userHasWrittenReview() && (
        <div className="new-review-icon" title="Write a review">
          <i className="fa-solid fa-pencil"></i>
        </div>
      )}
      {product.reviews.map(review => (
        <ProductReview key={review.id} review={review} user={user} />
      ))}
    </div>
  );
}

export default ProductReviews;
