import CartProduct from "../CartProduct";
import "./CartProducts.css";

function CartProducts({ products, itemsInCart }) {
  return (
    <div id="cart-products">
      {itemsInCart.map(item => {
        const product = products[item.product_id];
        return <CartProduct product={product} />
      })}
    </div>
  );
}

export default CartProducts;
