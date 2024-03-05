import { useModal } from "../../context/Modal";
import { getFormattedPrice, getPreviewText } from "../../utils/product";
import AddToCartButton from "../AddToCartButton";
import BookmarkButton from "../BookmarkButton";
import ProductBookmark from "../ProductBookmark";
import ProductRemaining from "../ProductRemaining";
import "./Product.css";

function Product({ product, user, inCartProductIds, bookmarkProductIds }) {
  const { createAndShowBookmarks, showCart, showProductDetails } = useModal();

  return (
    <div
      className="product"
      id={`product-${product.id}`}
      title="Click to view product details"
      onClick={() => showProductDetails(product, user, inCartProductIds, bookmarkProductIds)}
    >
      <div className="product-image">
        <img src={product.product_image} alt="product-image" />
      </div>
      <div className="product-price">
        <span className="dollar-sign">$</span>
        <span className="price">{getFormattedPrice(product.price)[0]}</span>
        <span className="decimal">{getFormattedPrice(product.price)[1]}</span>
      </div>
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
