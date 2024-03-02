import { useModal } from "../../context/Modal";
import { getFormattedPrice, getPreviewText } from "../../utils/product";
import "./Product.css";

function Product({ product, user, inCartProductIds }) {
  const { showBookmarks, showCart, showProductDetails } = useModal();

  return (
    <div
      className="product"
      id={`product-${product.id}`}
      title="Click to view product details"
      onClick={() => showProductDetails(product, user, inCartProductIds)}
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
      <div className="product-remaining">{product.remaining > 0 ? `${product.remaining} left` : "Sold out"}</div>
      <div className="product-btns">
        <button title="Bookmark this product" onClick={e => showBookmarks(e, user)}>Bookmark</button>
        {!inCartProductIds.includes(product.id) && product.remaining > 0 && (
          <button
            title="Add this product to cart"
            onClick={e => showCart(e, product, user)}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Product;
