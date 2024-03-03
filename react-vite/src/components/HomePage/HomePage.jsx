import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading";
import Products from "../Products";
import Cart from "../Cart";
import * as sessionActions from "../../redux/session";
import * as productActions from "../../redux/product";
import * as orderActions from "../../redux/order";
import * as bookmarkActions from "../../redux/bookmark";
import "./HomePage.css";

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(sessionActions.sessionUser);
  const products = useSelector(productActions.getProducts);
  const bookmarks = useSelector(bookmarkActions.getBookmarks);
  const getProductsObject = useSelector(productActions.getProductsObject);
  const orders = useSelector(orderActions.getOrders);
  const itemsInCart = orders.filter(order => !order.is_checkout)[0]?.items || [];
  const inCartProductIds = itemsInCart.map(item => item.product_id);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(sessionActions.restoreSession());
      await dispatch(productActions.loadProductsThunk());
      if (user?.user) {
        await dispatch(orderActions.loadOrdersThunk());
        await dispatch(bookmarkActions.loadBookmarksThunk(user.user.id));
      }
      setIsLoaded(true);
    }
    loadData();
  }, [user?.user, dispatch]);

  if (!isLoaded) return <Loading />

  return (
    <div id="home-page">
      <NavBar user={user?.user} products={getProductsObject} inCartProductIds={inCartProductIds} bookmarks={bookmarks} />
      <div id="main-content">
        <Products products={products} user={user?.user} inCartProductIds={inCartProductIds} />
        <Cart products={getProductsObject} user={user?.user} inCartProductIds={inCartProductIds} />
      </div>
    </div>
  );
}

export default HomePage;
