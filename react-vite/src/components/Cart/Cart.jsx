import { useSelector } from "react-redux";
import { closeCart } from "../../utils/cart";
import CartProducts from "../CartProducts";
import * as orderActions from "../../redux/order";
import "./Cart.css";

function Cart({ products }) {
  const orders = useSelector(orderActions.getOrders);
  const itemsInCart = orders.filter(item => !item.is_checkout)[0]?.items || [];

  return (
    <div id="cart-orders" className="hidden">
      <div className="cart-title">
        <h2 className="subheading">
          <div className="subheading">My shopping cart</div>
          <div className="past-orders">Past orders</div>
        </h2>
        <div className="close-cart-btn" title="Close cart" onClick={closeCart}>
          <i className="fa-solid fa-right-long"></i>
        </div>
      </div>
      <CartProducts products={products} itemsInCart={itemsInCart} />
    </div>
  );
}

export default Cart;
