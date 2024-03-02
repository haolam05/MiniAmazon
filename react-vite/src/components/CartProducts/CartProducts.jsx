import { getFormattedPrice } from "../../utils/product";
import CartProduct from "../CartProduct";
import "./CartProducts.css";

function CartProducts({ products, itemsInCart }) {
  const getSubTotal = items => {
    return items.reduce((sum, item) => sum + (+products[item.product_id].price * item.quantity), 0);
  }

  if (!itemsInCart.length) {
    return <p className="empty-cart-message">There is no items in your cart!</p>;
  }

  return (
    <div id="cart-products">
      <div className="summary">
        <div className="subtotal">
          <span className="text">Subtotal</span>
          <span className="dollar-sign">$</span>
          <span className="price">{getFormattedPrice(`${getSubTotal(itemsInCart)}`)[0]}</span>
          <span className="decimal">{getFormattedPrice(`${getSubTotal(itemsInCart)}`)[1]}</span>
        </div>
        <div className="checkout">
          <p>Proceed to checkout</p>
        </div>
      </div>
      {itemsInCart.map(item => {
        const product = products[item.product_id];
        return <CartProduct key={`cart-product-${item.id}`} product={product} />
      })}
    </div>
  );
}

export default CartProducts;
