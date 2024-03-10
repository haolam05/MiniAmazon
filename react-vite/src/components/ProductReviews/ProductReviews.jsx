import { useState } from "react";
import { useThirdLevelModal } from "../../context/ThirdLevelModal";
import ProductReview from "../ProductReview";
import ReviewForm from "../ReviewForm";
import "./ProductReviews.css";

function ProductReviews({ product, user, setAverageRating, setNumReviews }) {
  const { setThirdLevelModalContent } = useThirdLevelModal();
  const [reviews, setReviews] = useState(product?.reviews || []);

  if (!product) return;

  const otherReviews = reviews.filter(review => review.customer_id !== user.id);
  const myReview = reviews.filter(review => review.customer_id === user.id);

  const showReviewForm = () => {
    setThirdLevelModalContent(
      <ReviewForm
        product={product}
        setAverageRating={setAverageRating}
        reviews={reviews}
        setReviews={setReviews}
        setNumReviews={setNumReviews}
      />
    );
  }

  return (
    <div id="product-reviews">
      {!myReview.length && !product.is_deleted && product.seller_id !== user.id && (
        <div className="new-review-icon" title="Write a review" onClick={showReviewForm}>
          <i className="fa-solid fa-pencil"></i>
        </div>
      )}
      {[
        ...myReview,
        ...otherReviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      ].map(review => (
        <ProductReview
          key={review.id}
          reviews={reviews}
          review={review}
          setReviews={setReviews}
          user={user}
          setAverageRating={setAverageRating}
          setNumReviews={setNumReviews}
        />
      ))}
    </div>
  );
}

export default ProductReviews;
