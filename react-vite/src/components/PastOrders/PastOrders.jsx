import { useModal } from "../../context/Modal";
import PastOrder from "../PastOrder";
import "./PastOrders.css";

function PastOrders({ orders, products, user, inCartProductIds, bookmarkProductIds }) {
  const { setModalContent } = useModal();

  if (!orders.length) {
    return setModalContent(<>
      <h2 className="subheading">Past Orders</h2>
      <p>There is no past orders found!</p>
    </>)
  }

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
