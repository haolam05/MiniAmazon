import ProductReview from "../ProductReview";
import "./ProductReviews.css";

function ProductReviews({ product, user }) {
  if (!product) return;

  return (
    <div id="product-reviews">
      {product.reviews.map(review => (
        <ProductReview key={review.id} review={review} user={user} />
      ))}
    </div>
  );
}

export default ProductReviews;
