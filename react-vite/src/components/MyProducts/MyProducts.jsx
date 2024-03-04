import MyProduct from "../MyProduct";
import "./MyProducts.css";

function MyProducts({ products, user, bookmarkProductIds, itemsInCart }) {
  if (!user || !products) return;

  const myProducts = products.filter(product => product.seller_id === user.id);

  return (<>
    <h2 className="subheading">My Products</h2>
    <div id="my-products">
      {myProducts.map(product => (
        <MyProduct
          key={product.id}
          product={product}
          user={user}
          itemsInCart={itemsInCart}
          bookmarkProductIds={bookmarkProductIds}
        />
      ))}
    </div>
  </>);
}

export default MyProducts;
