import MyProduct from "../MyProduct";
import "./MyProducts.css";

function MyProducts({ products, user, bookmarkProductIds, inCartProductIds, itemsInCart }) {
  if (!user || !products) return;

  const myProducts = products.filter(product => product.seller_id === user.id);

  return (<>
    <h2 className="subheading">My Products</h2>
    {myProducts.length ? (
      <div id="my-products">
        {myProducts.map(product => (
          <MyProduct
            key={product.id}
            product={product}
            user={user}
            itemsInCart={itemsInCart}
            inCartProductIds={inCartProductIds}
            bookmarkProductIds={bookmarkProductIds}
          />
        ))}
      </div>
    ) : (
      <p className="alert-success">You have not listed any products yet!</p >
    )}
  </>);
}

export default MyProducts;
