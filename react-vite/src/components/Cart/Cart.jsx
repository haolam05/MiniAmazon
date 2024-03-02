import { useSelector } from "react-redux";
import { closeCart } from "../../utils/cart";
import { useModal } from "../../context/Modal";
import CartProducts from "../CartProducts";
import PastOrders from "../PastOrders";
import * as orderActions from "../../redux/order";
import "./Cart.css";

function Cart({ products, user, inCartProductIds }) {
  const { setModalContent } = useModal();
  const orders = useSelector(orderActions.getOrders);
  const itemsInCart = orders.filter(item => !item.is_checkout)[0]?.items || [];
  const pastOrders = orders.filter(order => order.is_checkout);

  const showPastOrders = () => {
    setModalContent(<PastOrders orders={pastOrders.reverse()} products={products} />);
  }

  return (
    <div id="cart-orders" className="hidden">
      <div className="cart-title">
        <h2 className="subheading">
          <div className="subheading">My shopping cart</div>
          <div className="past-orders" onClick={showPastOrders}>Past orders</div>
        </h2>
        <div className="close-cart-btn" title="Close cart" onClick={closeCart}>
          <i className="fa-solid fa-right-long"></i>
        </div>
      </div>
      <CartProducts products={products} itemsInCart={itemsInCart} user={user} inCartProductIds={inCartProductIds} />
    </div>
  );
}

export default Cart;
