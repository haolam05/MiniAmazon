import { useSecondaryModal } from "../../context/SecondaryModal";
import { getPreviewText } from "../../utils/product";
import ProductPrice from "../ProductPrice";

function PastOrderItem({ item, product, user, inCartProductIds, bookmarkProductIds }) {
  const { showProductDetails } = useSecondaryModal();

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
        <ProductPrice product={product} cls="cart-product-price" />
      </div>
    </div>
  );
}

export default PastOrderItem;
