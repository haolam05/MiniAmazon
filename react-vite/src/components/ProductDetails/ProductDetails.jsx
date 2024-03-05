import { useState } from "react";
import { getAvatarUrl } from "../../utils/navbar";
import { getFormattedPrice, getPreviewText } from "../../utils/product";
import { getAverageRating, toggleReviewInfo } from "../../utils/review";
import ProductReviews from "../ProductReviews";
import "./ProductDetails.css";

function ProductDetails({ user, product, createAndShowBookmarks, showCart, inCartProductIds, bookmarkProductIds }) {
  const [averageRating, setAverageRating] = useState(getAverageRating(product.reviews.map(review => review.rating)));

  const getCursorPositionOnImage = e => {
    return [position.x, position.y];
  }

  const handleLenMove = e => {
    const [lenX, lenY] = [e.pageX, e.pageY];
    const [lenWidth, lenHeight] = [e.target.offsetWidth, e.target.offsetHeight];
    const [cursorX, cursorY] = [e.clientX, e.clientY];
    console.log("LEN POSITION", lenX, lenY);
    console.log("CURSOR POSITION", cursorX, cursorY)
    e.target.style.left = cursorX;
    e.target.style.top = cursorY;
  }

  const showMagnifyImage = e => {
    //   const image = document.querySelector("#product-details .product-image");
    //   const [imageX, imageY] = [image.getBoundingClientRect().left, image.getBoundingClientRect().top];
    //   const [cursorX, cursorY] = [e.clientX, e.clientY];
    //   const len = document.querySelector("#product-details .image-len");
    //   const [offsetX, offsetY] = [len.getBoundingClientRect().left, len.getBoundingClientRect().top];

    //   const [nextX, nextY] = [cursorX - offsetX, cursorY - offsetY];
    //   if (nextX >= imageX) len.style.top = nextY + "px";
    //   if (nextY <= imageY) len.style.left = nextX + "px";
  }

  return (
    <>
      <h2 className="product-title subheading">{product.name}</h2>
      <div id="product-details">
        {/* <div className="product-image-magnify">
          <img src={product.product_image} alt="product-image-magnify" />
        </div> */}
        <div className="product-wrapper">
          <div className="product cursor-normal" id="product.id">
            <div className="product-image">
              {/* <div className="image-len"></div> */}
              <img src={product.product_image} alt="product-image" onMouseMove={showMagnifyImage} />
              {user && (
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
