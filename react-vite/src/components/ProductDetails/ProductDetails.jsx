import { useEffect, useState } from "react";
import { getPreviewText } from "../../utils/product";
import { useThirdLevelModal } from "../../context/ThirdLevelModal";
import { hideMagnifyImage, showMagnifyImage } from "../../utils/magnify";
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

function ProductDetails({ user, product, showCart, inCartProductIds, bookmarkProductIds }) {
  const { setThirdLevelModalContent, createAndShowBookmarks } = useThirdLevelModal();
  const [averageRating, setAverageRating] = useState(getAverageRating(product.reviews.map(review => review.rating)));
  const [downloadProductImageUrl, setDownloadProductImageUrl] = useState("");

  useEffect(() => {
    const getDownloadImage = async () => {
      const parts = product.product_image.split("/");
      const file = parts[parts.length - 1];
      const res = await fetch(`/api/aws/download/${file}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadProductImageUrl(url);
    }
    getDownloadImage();
  }, []);

  const showFullSizeImage = e => {
    if (e.target.classList.contains("image-len")) {
      setThirdLevelModalContent(
        <>
          <img src={product.product_image} alt="product-image" />
          <a id="download-link" download href={downloadProductImageUrl}>Download Image</a>
        </>
      );
    }
  }

  return (
    <>
      <h2 className="product-title subheading">{product.name}</h2>
      <div id="product-details" onMouseMove={hideMagnifyImage}>
        <div className="product-image-magnify hidden"></div>
        <div className="product-wrapper">
          <div className="product cursor-normal" id={product.id}>
            <div className="product-image" onClick={showFullSizeImage}>
              <div
                className="image-len hidden"
                onMouseMove={showMagnifyImage}
              />
              <img
                src={product.product_image}
                alt="product-image"
                className="product-image-tag"
                onMouseMove={showMagnifyImage}
              />
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
