import { getAvatarUrl } from "../../utils/navbar";
import "./ProductReview.css";

function ProductReview({ review }) {
  if (!review) return;

  return (
    <div className="product-review" id={`product-review-${review.id}`}>
      <div className="customer-image">
        <img src={getAvatarUrl(review.customer.profile_image_url)} alt="reviewer-avatar" />
      </div>
      <div className="rating">
        {<i className={`fa-solid fa-star ${review.rating > 0 ? "orange" : "gray"}`}></i>}
        {<i className={`fa-solid fa-star ${review.rating > 1 ? "orange" : "gray"}`}></i>}
        {<i className={`fa-solid fa-star ${review.rating > 2 ? "orange" : "gray"}`}></i>}
        {<i className={`fa-solid fa-star ${review.rating > 3 ? "orange" : "gray"}`}></i>}
        {<i className={`fa-solid fa-star ${review.rating > 4 ? "orange" : "gray"}`}></i>}
      </div>
      <div className="review">
        <p>{review.review}</p>
      </div>
    </div>
  );
}

export default ProductReview;
