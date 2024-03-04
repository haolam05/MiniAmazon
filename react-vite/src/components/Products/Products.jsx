import Product from "../Product/Product";
import "./Products.css";

function Products({ products, user, inCartProductIds, bookmarkProductIds }) {
  return (
    <div id="products">
      {products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map(product =>
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
