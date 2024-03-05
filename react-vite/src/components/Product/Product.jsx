import { useModal } from "../../context/Modal";
import { getFormattedPrice, getPreviewText } from "../../utils/product";
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
            onClick={e => createAndShowBookmarks(e, user, product.id)}
            className="bookmark-btn"
          >
            Bookmark
          </button>
        )}
        {user && !inCartProductIds.includes(product.id) && product.remaining > 0 && !product.is_deleted && (
          <button
            title={user.id === product.seller_id ? "You can not add your own product" : "Add this product to cart"}
            onClick={e => showCart(e, product, user)}
            className={`add-to-cart-btn${user.id === product.seller_id ? " disabled" : ""}`}
            disabled={user.id === product.seller_id}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Product;
