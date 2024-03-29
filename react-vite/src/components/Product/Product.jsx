import { useModal } from "../../context/Modal";
import { useSecondaryModal } from "../../context/SecondaryModal";
import { useThirdLevelModal } from "../../context/ThirdLevelModal";
import { getPreviewText } from "../../utils/product";
import AddToCartButton from "../AddToCartButton";
import BookmarkButton from "../BookmarkButton";
import ProductBookmark from "../ProductBookmark";
import ProductPrice from "../ProductPrice";
import ProductRemaining from "../ProductRemaining";
import "./Product.css";

function Product({ product, user, inCartProductIds, bookmarkProductIds, secondaryModal }) {
  const { showCart, showProductDetails } = useModal();
  const { setSecondaryModalContent } = useSecondaryModal();
  const { createAndShowBookmarks } = useThirdLevelModal();

  return (
    <div
      className="product"
      id={`product-${product.id}`}
      title="Click to view product details"
      onClick={() => showProductDetails(product, user, inCartProductIds, bookmarkProductIds, secondaryModal, setSecondaryModalContent)}
    >
      <div className="product-image">
        <img src={product.product_image} alt="product-image" />
      </div>
      <ProductPrice product={product} />
      <p className="product-name">{getPreviewText(product.name)}</p>
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
  );
}

export default Product;
