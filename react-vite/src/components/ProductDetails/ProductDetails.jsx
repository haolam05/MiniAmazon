import { useState } from "react";
import { getAvatarUrl } from "../../utils/navbar";
import { getFormattedPrice, getPreviewText } from "../../utils/product";
import { getAverageRating, toggleReviewInfo } from "../../utils/review";
import ProductReviews from "../ProductReviews";
import "./ProductDetails.css";

function ProductDetails({ user, product, createAndShowBookmarks, showCart, inCartProductIds, bookmarkProductIds }) {
  const [averageRating, setAverageRating] = useState(getAverageRating(product.reviews.map(review => review.rating)));

  return (
    <>
      <h2 className="product-title subheading">{product.name}</h2>
      <div id="product-details">
        <div className="product-wrapper">
          <div className="product" id="product.id">
            <div className="product-image">
              <img src={product.product_image} alt="product-image" />
              {user && (
                <div className="product-review-info" onClick={toggleReviewInfo}>
                  <div className="sticker" title="Click to open/collapse reviews information"></div>
                  <div className="review-info">
                    <div className="total-reviews">
                      <span>Total reviews ~ {product.reviews.length} 📝</span>
                    </div>
                    <div className="average-rating">
                      <span>Average rating ~ {averageRating} </span>
                      <i className={`fa-solid fa-star`}></i>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="product-price">
              <span className="dollar-sign">$</span>
              <span className="price">{getFormattedPrice(product.price)[0]}</span>
              <span className="decimal">{getFormattedPrice(product.price)[1]}</span>
            </div>
            <p className="product-category">Category: {getPreviewText(product.category)}</p>
            <div className={`product-remaining${product.is_deleted ? " red" : ""}`}>{
              product.is_deleted ? "Discontinued" : (product.remaining > 0 ? `${product.remaining} left` : "Sold out")
            }</div>
            {user && bookmarkProductIds.includes(product.id) && (
              <div className="product-bookmark" title="This product has already been bookmarked">
                <i className="fa-solid fa-bookmark"></i>
              </div>
            )}
            <div className="product-btns">
              {user && !bookmarkProductIds.includes(product.id) && !product.is_deleted && (
                <button
                  title="Bookmark this product"
                  onClick={createAndShowBookmarks}
                  className="bookmark-btn"
                >
                  Bookmark
                </button>
              )}
              {user && !inCartProductIds.includes(product.id) && product.remaining > 0 && !product.is_deleted && (
                <button
                  title="Add this product to cart"
                  onClick={showCart}
                  className="add-to-cart-btn"
                >
                  Add to cart
                </button>
              )}
            </div>
          </div>
          <div className="product-info">
            <div className="product-seller">
              <div><img src={getAvatarUrl(product.seller.profile_image_url)} alt="avatar" /></div>
              <div className="product-seller-info">
                <div className="product-seller-title">Seller Info</div>
                <div>{product.seller.first_name}, {product.seller.last_name}</div>
                <div>{product.seller.email}</div>
              </div>
            </div>
            <div className="product-description">
              {product.description}
            </div>
          </div>
        </div>
        {user && <ProductReviews product={product} user={user} setAverageRating={setAverageRating} />}
      </div>
    </>
  );
}

export default ProductDetails;
