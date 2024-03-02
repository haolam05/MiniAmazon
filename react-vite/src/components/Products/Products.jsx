import Product from "../Product/Product";
import "./Products.css";

function Products({ products, user, inCartProductIds }) {
  return (
    <div id="products">
      {products.map(product => <Product key={product.id} product={product} user={user} inCartProductIds={inCartProductIds} />)}
    </div>
  );
}

export default Products;
