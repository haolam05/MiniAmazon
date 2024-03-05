import PastOrder from "../PastOrder";
import "./PastOrders.css";

function PastOrders({ orders, products, user, inCartProductIds, bookmarkProductIds }) {
  return (<>
    <h2 className="subheading">Past Orders</h2>
    <div id="past-orders">
      {orders.map(order => <PastOrder
        key={order.id}
        order={order}
        products={products}
        user={user}
        inCartProductIds={inCartProductIds}
        bookmarkProductIds={bookmarkProductIds}
      />)}
    </div>
  </>);
}

export default PastOrders;
