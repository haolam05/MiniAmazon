import Product from "../Product/Product";
import "./Products.css";

function Products({ products }) {
  return (
    <div id="products">
      {products.map(product => <Product key={product.id} product={product} />)}
    </div>
  );
}

export default Products;
