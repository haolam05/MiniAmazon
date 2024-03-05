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
import ProductReviewInfo from "../ProductReviewInfo";
import "./ProductDetails.css";

function ProductDetails({ user, product, createAndShowBookmarks, showCart, inCartProductIds, bookmarkProductIds }) {
  const [averageRating, setAverageRating] = useState(getAverageRating(product.reviews.map(review => review.rating)));

  const showMagnifyImage = e => {
    const len = document.querySelector("#product-details .image-len");
    const image = document.querySelector("#product-details .product-image img");
    const imageMagnifyContainer = document.querySelector("#product-details .product-image-magnify");
    const lenInfo = len.getBoundingClientRect();
    const imageInfo = image.getBoundingClientRect();
    const paddingX = 5;  // 5px horizontal padding of parent container
    const paddingY = 10; // 10px vertical padding of parent container

    if (!len || !image || !imageMagnifyContainer) return;

    len.classList.remove("hidden");
    imageMagnifyContainer.classList.remove("hidden")

    if (image && len) {
      // cursorX = the width between left of screen (viewport) to current cursor position
      // cursorY = the height between top of screen (viewport) to current cursor position
      const [cursorX, cursorY] = [
        e.clientX,
        e.clientY
      ];

      // imageX = the width between left of screen (viewport) to the start of image position (left)
      // imageY = the height between top of screen (viewport) to the start of image position (top)
      const [imageX, imageY] = [
        imageInfo.left,
        imageInfo.top
      ];

      // offsetX = the width between the start of the image from the left side to the cursor position (left)
      // offsetY = the height between the start of the image from the top side to the cursor position (top)
      let [offsetX, offsetY] = [
        cursorX - imageX + paddingX,
        cursorY - imageY + paddingY
      ];

      // imageWidth = width of the image (including border and padding)
      // imageHeight = height of the image (including border and padding)
      const [imageWidth, imageHeight] = [
        imageInfo.width,
        imageInfo.height
      ];

      // prevent len to get out-of-bound
      if (offsetX < 0) offsetX = 0;
      if (offsetY < 0) offsetY = 0;
      if (offsetX > imageWidth - lenInfo.width) offsetX = imageWidth - lenInfo.width + paddingX;
      if (offsetY > imageHeight - lenInfo.height) offsetY = imageHeight - lenInfo.height;

      // set len position
      len.style.left = offsetX + "px";
      len.style.top = offsetY + "px";

      // Ratio between len & the container of the magnified image
      const ratioX = imageMagnifyContainer.offsetWidth / len.offsetWidth;
      const ratioY = imageMagnifyContainer.offsetHeight / len.offsetHeight;

      // backgroundImage = set maginified image
      // backgroundSize = zoom magnified image based on ratio calculated above
      // backgroundPosition = position the background image(top left) to the correct position based on the len
      //                    = the maginify container doesn't have padding ---> subtract
      //                    = minus: based on top-left
      imageMagnifyContainer.style.backgroundImage = `url('${image.src}')`;
      imageMagnifyContainer.style.backgroundSize = `${imageWidth * ratioX}px ${imageHeight * ratioY}px`;
      imageMagnifyContainer.style.backgroundPosition = `-${(offsetX - paddingX) * ratioX}px -${(offsetY - paddingY) * ratioY}px`;
    }
  }

  const hideMagnifyImage = () => {
    const len = document.querySelector("#product-details .image-len");
    const imageMagnifyContainer = document.querySelector("#product-details .product-image-magnify");
    if (len && imageMagnifyContainer) {
      len.classList.add("hidden");
      imageMagnifyContainer.classList.add("hidden")
    }
  }

  return (
    <>
      <h2 className="product-title subheading">{product.name}</h2>
      <div id="product-details">
        <div className="product-image-magnify hidden"></div>
        <div className="product-wrapper">
          <div className="product cursor-normal" id={product.id}>
            <div className="product-image">
              <div className="image-len hidden" onMouseMove={showMagnifyImage}></div>
              <img src={product.product_image} alt="product-image" onMouseMove={showMagnifyImage} onMouseLeave={hideMagnifyImage} />
              <ProductReviewInfo
                user={user}
                product={product}
                toggleReviewInfo={toggleReviewInfo}
                averageRating={averageRating}
              />
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
        {user && (
          <ProductReviews
            product={product}
            user={user}
            setAverageRating={setAverageRating}
          />
        )}
      </div>
    </>
  );
}

export default ProductDetails;
