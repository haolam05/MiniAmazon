import PastOrder from "../PastOrder";
import "./PastOrders.css";

function PastOrders({ orders, products }) {
  return (<>
    <h2 className="subheading">Past Orders</h2>
    <div id="past-orders">
      {orders.map(order => <PastOrder key={order.id} order={order} products={products} />)}
    </div>
  </>);
}

export default PastOrders;
