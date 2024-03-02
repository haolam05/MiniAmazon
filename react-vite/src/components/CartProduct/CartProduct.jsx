import { useModal } from "../../context/Modal";
import { getFormattedPrice, getPreviewText } from "../../utils/product";
import ProductDetails from "../ProductDetails";
import "./CartProduct.css";

function CartProduct({ product }) {
  const { setModalContent } = useModal();

  const showBookmarks = e => {
    e.preventDefault();
    e.stopPropagation();
  }

  const showCart = e => {
    e.preventDefault();
    e.stopPropagation();
  }

  const showProductDetails = e => {
    e.preventDefault();
    setModalContent(
      <ProductDetails
        product={product}
        showBookmarks={showBookmarks}
        showCart={showCart}
      />
    );
  }

  const removeProductFromCart = e => {
    e.stopPropagation();
  }

  return (
    <div
      className="cart-product"
      id={product.id}
      title="Click to view product details"
      onClick={showProductDetails}
    >
      <div className="cart-product-image">
        <img src={product.product_image} alt="cart-product-image" />
        <div className="cart-product-quantity">
          <div className="minus"><i className="fa-solid fa-minus"></i></div>
          <div className="quantity"><input type="text" /></div>
          <div className="minus"><i className="fa-solid fa-plus"></i></div>
        </div>
      </div>
      <div className="cart-product-info">
        <p className="cart-product-name">{getPreviewText(product.name)}</p>
        <div className="cart-product-price">
          <span className="dollar-sign">$</span>
          <span className="price">{getFormattedPrice(product.price)[0]}</span>
          <span className="decimal">{getFormattedPrice(product.price)[1]}</span>
        </div>
        <div className="cart-product-delete-btn" onClick={removeProductFromCart}>Delete</div>
      </div>
    </div>
  );
}

export default CartProduct;
