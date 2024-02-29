import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading";
import * as sessionActions from "../../redux/session";
import "./HomePage.css";

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(sessionActions.sessionUser);

  useEffect(() => {
    const loadInfo = async () => {
      await dispatch(sessionActions.restoreSession());
      setIsLoaded(true);
    }
    loadInfo();
  }, [dispatch]);

  if (!isLoaded) return <Loading />;

  return (
    <div id="home-page">
      <NavBar user={user?.user} />
      <div id="main-content"></div>
      <div id="cart"></div>
    </div>
  );
}

export default HomePage;
