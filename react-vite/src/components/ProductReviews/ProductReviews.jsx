import { useModal } from "../../context/Modal";
import ProductReview from "../ProductReview";
import ReviewForm from "../ReviewForm";
import "./ProductReviews.css";

function ProductReviews({ product, user, setAverageRating }) {
  const { setModalContent } = useModal();

  if (!product) return;

  const otherReviews = product.reviews.filter(review => review.customer_id !== user.id);
  const myReview = product.reviews.filter(review => review.customer_id === user.id);

  const showReviewForm = () => {
    setModalContent(
      <ReviewForm
        productId={product.id}
      />
    );
  }

  return (
    <div id="product-reviews">
      {!myReview.length && (
        <div className="new-review-icon" title="Write a review" onClick={showReviewForm}>
          <i className="fa-solid fa-pencil"></i>
        </div>
      )}
      {[...myReview, ...otherReviews].map(review => (
        <ProductReview
          key={review.id}
          reviews={product.reviews}
          review={review}
          user={user}
          setAverageRating={setAverageRating}
        />
      ))}
    </div>
  );
}

export default ProductReviews;
