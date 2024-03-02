import { useEffect } from "react";
import { useSelector } from "react-redux";
import Product from "../Product/Product";
import * as orderActions from "../../redux/order";
import "./Products.css";

function Products({ products, user }) {
  const orders = useSelector(orderActions.getOrders);
  const itemsInCart = orders.filter(order => !order.is_checkout)[0]?.items || [];
  const inCartProductIds = itemsInCart.map(item => item.product_id);

  return (
    <div id="products">
      {products.map(product => <Product key={product.id} product={product} user={user} inCartProductIds={inCartProductIds} />)}
    </div>
  );
}

export default Products;
