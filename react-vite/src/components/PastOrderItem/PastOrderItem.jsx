import { useModal } from "../../context/Modal";
import { getFormattedPrice, getPreviewText } from "../../utils/product";

function PastOrderItem({ item, product, user, inCartProductIds, bookmarkProductIds }) {
  const { showProductDetails } = useModal();

  return (
    <div
      className="cart-product cursor-normal"
      id={`cart-product-${product.id}`}
    >
      <div className="cart-product-image">
        <img
          src={product.product_image}
          alt="cart-product-image"
          className="cursor-pointer"
          onClick={() => showProductDetails(product, user, inCartProductIds, bookmarkProductIds)}
        />
        <p style={{ textAlign: 'center' }}>Quantity: {item.quantity}</p>
      </div>
      <div className="cart-product-info">
        <p className="cart-product-name">{getPreviewText(product.name)}</p>
        <div className="cart-product-price">
          <span className="dollar-sign">$</span>
          <span className="price">{getFormattedPrice(product.price)[0]}</span>
          <span className="decimal">{getFormattedPrice(product.price)[1]}</span>
        </div>
      </div>
    </div>
  );
}

export default PastOrderItem;
