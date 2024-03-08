import { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Products.css";

function Products({ products, user, inCartProductIds, bookmarkProductIds, productNameInput, productCategoryInput }) {
  const [currentProducts, setCurrentProducts] = useState(products);

  useEffect(() => {
    let nextProducts = [];

    if (productCategoryInput === "") {
      nextProducts = [...products];
    } else {
      nextProducts = products.filter(product => product.category === productCategoryInput);
    }

    if (productNameInput !== "") {
      nextProducts = nextProducts.filter(product => product.name.toLowerCase().includes(productNameInput.toLowerCase()));
    }

    setCurrentProducts(nextProducts);
  }, [productNameInput, productCategoryInput, products]);

  const validProducts = currentProducts.filter(product => !product.is_deleted);

  if (!validProducts.length) return (
    <div id="products" style={{ width: '100%' }}>
      <p>There is no products found!</p>
    </div>
  );

  return (
    <div id="products">
      {validProducts.map(product =>
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
