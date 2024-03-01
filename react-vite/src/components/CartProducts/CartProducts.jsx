import "./CartProducts.css";

function CartProducts({ products, itemsInCart }) {
  return (
    <div id="cart-products">
      {itemsInCart.map(item => {
        const product = products[item.product_id];
        return <div key={item.id}>{product.name}</div>
      })}
    </div>
  );
}

export default CartProducts;
