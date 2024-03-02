import PastOrderItem from "../PastOrderItem";
import "./PastOrder.css";

function PastOrder({ order, products }) {
  if (!order) return;

  return (
    <div className="past-order">
      <h3 className="past-order-number">Order #{order.id}</h3>
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
