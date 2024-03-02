import Product from "../Product/Product";
import "./Products.css";

function Products({ products, user }) {
  return (
    <div id="products">
      {products.map(product => <Product key={product.id} product={product} user={user} />)}
    </div>
  );
}

export default Products;
