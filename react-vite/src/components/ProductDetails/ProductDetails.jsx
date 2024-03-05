import { useState } from "react";
import { getPreviewText } from "../../utils/product";
import { getAverageRating, toggleReviewInfo } from "../../utils/review";
import ProductReviews from "../ProductReviews";
import AddToCartButton from "../AddToCartButton";
import BookmarkButton from "../BookmarkButton";
import ProductInfo from "../ProductInfo/ProductInfo";
import ProductBookmark from "../ProductBookmark";
import ProductRemaining from "../ProductRemaining";
import ProductPrice from "../ProductPrice";
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
            <ProductPrice product={product} />
            <p className="product-category">Category: {getPreviewText(product.category)}</p>
            <ProductRemaining product={product} />
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
