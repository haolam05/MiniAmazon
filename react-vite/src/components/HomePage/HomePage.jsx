import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading";
import Products from "../Products";
import * as sessionActions from "../../redux/session";
import * as productActions from "../../redux/product";
import "./HomePage.css";

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(sessionActions.sessionUser);
  const products = useSelector(productActions.getProducts);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(sessionActions.restoreSession());
      await dispatch(productActions.loadProductsThunk());
      setIsLoaded(true);
    }
    loadData();
  }, [user?.user, dispatch]);

  if (!isLoaded) return <Loading />

  return (
    <div id="home-page">
      <NavBar user={user?.user} />
      <div id="main-content">
        <Products products={products} />
        <div id="cart" style={{ color: 'red' }}></div>
      </div>
    </div>
  );
}

export default HomePage;
