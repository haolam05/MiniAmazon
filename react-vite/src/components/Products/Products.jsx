import Product from "../Product/Product";
import "./Products.css";

function Products({ products, user, inCartProductIds, bookmarkProductIds }) {
  return (
    <div id="products">
      {products.map(product =>
        <Product
          key={product.id}
          product={product}
          user={user}
          inCartProductIds={inCartProductIds}
          bookmarkProductIds={bookmarkProductIds}
        />)}
    </div>
  );
}

export default Products;
