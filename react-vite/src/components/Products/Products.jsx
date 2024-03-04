import { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Products.css";

function Products({ products, user, inCartProductIds, bookmarkProductIds, productCategoryInput }) {
  const [currentProducts, setCurrentProducts] = useState(products);

  useEffect(() => {
    if (productCategoryInput === "") {
      setCurrentProducts([...products]);
    } else {
      setCurrentProducts(products.filter(product => product.category === productCategoryInput));
    }
  }, [productCategoryInput, products]);

  return (
    <div id="products">
      {currentProducts.reverse().map(product =>
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
