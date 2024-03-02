import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getFormattedPrice } from "../../utils/product";
import CartProduct from "../CartProduct";
import NotificationModal from "../NotificationModal";
import * as orderActions from "../../redux/order";
import "./CartProducts.css";

function CartProducts({ products, itemsInCart, user }) {
  const { setModalContent } = useModal();
  const dispatch = useDispatch();

  const getSubTotal = items => {
    const total = items.reduce((sum, item) => sum + (+products[item.product_id].price * item.quantity), 0);
    return getFormattedPrice(`${total}`).join(".");
  }

  const checkoutOrder = async () => {
    const data = await dispatch(orderActions.checkoutOrderThunk(itemsInCart[0].order_id));
    if (data?.errors) {
      return setModalContent(<NotificationModal message={data.errors.message} status="modal-errors" />);
    }
    return setModalContent(<NotificationModal message="You have successfully checkout!" status="alert-success" />);
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
        <div className="checkout" onClick={checkoutOrder}>
          <p>Proceed to checkout</p>
        </div>
      </div>
      {itemsInCart.map(item => {
        const product = products[item.product_id];
        return <CartProduct key={item.id} product={product} item={item} user={user} />
      })}
    </div>
  );
}

export default CartProducts;
