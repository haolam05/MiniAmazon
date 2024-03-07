import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../Cart";
import NavBar from "../NavBar";
import Loading from "../Loading";
import Products from "../Products";
import ProductForm from "../ProductForm";
import MyProducts from "../MyProducts";
import CustomerServiceChatWindow from "../CustomerServiceChatWindow";
import * as sessionActions from "../../redux/session";
import * as productActions from "../../redux/product";
import * as orderActions from "../../redux/order";
import * as bookmarkActions from "../../redux/bookmark";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const [productNameInput, setProductNameInput] = useState("");
  const [productCategoryInput, setProductCategoryInput] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { setModalContent } = useModal();
  const user = useSelector(sessionActions.sessionUser);
  const products = useSelector(productActions.getProducts);
  const bookmarks = useSelector(bookmarkActions.getBookmarks);
  const bookmarkProductIds = bookmarks?.map(bookmark => bookmark.product_id) || [];
  const getProductsObject = useSelector(productActions.getProductsObject);
  const orders = useSelector(orderActions.getOrders);
  const itemsInCart = orders.filter(order => !order.is_checkout)[0]?.items || [];
  const inCartProductIds = itemsInCart.map(item => item.product_id);

  const showProductForm = () => setModalContent(<ProductForm />);
  const showMyProducts = () => setModalContent(
    <MyProducts
      products={products}
      user={user?.user}
      itemsInCart={itemsInCart}
      inCartProductIds={inCartProductIds}
      bookmarkProductIds={bookmarkProductIds}
    />
  );

  useEffect(() => {
    // const url = import.meta.env.MODE === 'development' ? "http://127.0.0.1:8000" : "https://miniamazon.onrender.com";
    // const socket = io(url);

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
      {user?.user && (
        <>
          <div className="manage-my-product-btns">
            <i className="fa-solid fa-plus" title="Add a product" onClick={showProductForm}></i>
            <i className="fa-solid fa-database" title="My products" onClick={showMyProducts}></i>
          </div>
          <CustomerServiceChatWindow />
        </>
      )}
      <NavBar
        user={user?.user}
        products={getProductsObject}
        inCartProductIds={inCartProductIds}
        bookmarks={bookmarks}
        bookmarkProductIds={bookmarkProductIds}
        productNameInput={productNameInput}
        productCategoryInput={productCategoryInput}
        setProductNameInput={setProductNameInput}
        setProductCategoryInput={setProductCategoryInput}
      />
      <div id="main-content">
        <Products
          products={products}
          user={user?.user}
          inCartProductIds={inCartProductIds}
          bookmarkProductIds={bookmarkProductIds}
          productNameInput={productNameInput}
          productCategoryInput={productCategoryInput}
        />
        <Cart
          products={getProductsObject}
          user={user?.user}
          inCartProductIds={inCartProductIds}
          bookmarkProductIds={bookmarkProductIds}
        />
      </div>
    </div>
  );
}

export default HomePage;
