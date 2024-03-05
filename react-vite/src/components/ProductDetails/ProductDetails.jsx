import { useState } from "react";
import { getFormattedPrice, getPreviewText } from "../../utils/product";
import { getAverageRating, toggleReviewInfo } from "../../utils/review";
import ProductReviews from "../ProductReviews";
import AddToCartButton from "../AddToCartButton";
import BookmarkButton from "../BookmarkButton";
import ProductInfo from "../ProductInfo/ProductInfo";
import ProductBookmark from "../ProductBookmark";
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
            <ProductBookmark
              user={user}
              bookmarkProductIds={bookmarkProductIds}
              product={product}
            />
            <div className="product-btns">
              <BookmarkButton
                bookmarkProductIds={bookmarkProductIds}
                product={product}
                user={user}
                createAndShowBookmarks={e => createAndShowBookmarks(e, product.id)}
              />
              <AddToCartButton
                showCart={e => showCart(e, product)}
                product={product}
                user={user}
                inCartProductIds={inCartProductIds}
              />
            </div>
          </div>
          <ProductInfo product={product} />
        </div>
        {user && <ProductReviews product={product} user={user} setAverageRating={setAverageRating} />}
      </div>
    </>
  );
}

export default ProductDetails;
