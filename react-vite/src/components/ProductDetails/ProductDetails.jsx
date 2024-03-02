import { getAvatarUrl } from "../../utils/navbar";
import { getFormattedPrice, getPreviewText } from "../../utils/product";
import "./ProductDetails.css";

function ProductDetails({ product, showBookmarks, showCart, inCartProductIds }) {
  return (
    <>
      <h2 className="product-title subheading">{product.name}</h2>
      <div id="product-details">
        <div className="product" id="product.id">
          <div className="product-image">
            <img src={product.product_image} alt="product-image" />
          </div>
          <div className="product-price">
            <span className="dollar-sign">$</span>
            <span className="price">{getFormattedPrice(product.price)[0]}</span>
            <span className="decimal">{getFormattedPrice(product.price)[1]}</span>
          </div>
          <p className="product-category">Category: {getPreviewText(product.category)}</p>
          <div className="product-remaining">{product.remaining > 0 ? `${product.remaining} left` : "Sold out"}</div>
          <div className="product-btns">
            <button title="Bookmark this product" onClick={showBookmarks}>Bookmark</button>
            {!inCartProductIds.includes(product.id) && product.remaining > 0 && (
              <button title="Add this product to cart" onClick={showCart}>Add to cart</button>
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
    </>
  );
}

export default ProductDetails;
