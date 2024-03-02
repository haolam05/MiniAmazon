import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading";
import Products from "../Products";
import Cart from "../Cart";
import * as sessionActions from "../../redux/session";
import * as productActions from "../../redux/product";
import * as orderActions from "../../redux/order";
import "./HomePage.css";

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(sessionActions.sessionUser);
  const products = useSelector(productActions.getProducts);
  const getProductsObject = useSelector(productActions.getProductsObject);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(sessionActions.restoreSession());
      await dispatch(productActions.loadProductsThunk());
      await dispatch(orderActions.loadOrdersThunk());
      setIsLoaded(true);
    }
    loadData();
  }, [user?.user, dispatch]);

  if (!isLoaded) return <Loading />

  return (
    <div id="home-page">
      <NavBar user={user?.user} />
      <div id="main-content">
        <Products products={products} user={user?.user} />
        <Cart products={getProductsObject} />
      </div>
    </div>
  );
}

export default HomePage;
