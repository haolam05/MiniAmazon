import ProductReview from "../ProductReview";
import "./ProductReviews.css";

function ProductReviews({ product }) {
  if (!product) return;

  return (
    <div className="product-reviews">
      {product.reviews.map(review => (
        <ProductReview key={review.id} review={review} />
      ))}
    </div>
  );
}

export default ProductReviews;
