import { getFormattedPrice } from "../../utils/product";
import PastOrderItem from "../PastOrderItem";
import "./PastOrder.css";

function PastOrder({ order, products }) {
  if (!order) return;

  const getSubTotal = items => {
    console.log(order.items)
    const total = items.reduce((sum, item) => sum + (+products[item.product_id].price * item.quantity), 0);
    return getFormattedPrice(`${total}`).join(".");
  }

  return (
    <div className="past-order">
      <h3 className="past-order-number">
        <span>Order #{order.id}</span>
        <span className="tilde">~</span>
        <span className="total">${getSubTotal(order.items)}</span>
      </h3>
      <p className="order-date">{order.updated_at}</p>
      <div className="past-order-items">
        {order.items.map(item => {
          const product = products[item.product_id]
          return <PastOrderItem key={item.id} item={item} product={product} />
        })}
      </div>
    </div>
  );
}

export default PastOrder;
