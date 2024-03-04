import Product from "../Product/Product";
import "./Products.css";

function Products({ products, user, inCartProductIds, bookmarkProductIds }) {

  return (
    <div id="products">
      {products.reverse().map(product =>
        <Product
          key={product.id}
          product={product}
          user={user}
          inCartProductIds={inCartProductIds}
          bookmarkProductIds={bookmarkProductIds}
        />).reverse()}
    </div>
  );
}

export default Products;
