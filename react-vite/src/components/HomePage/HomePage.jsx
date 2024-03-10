import { io } from "socket.io-client";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { choosePort, closeChat } from "../../utils/chat";
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
import NotificationModal from "../NotificationModal";

const socket = io(choosePort());

function HomePage() {
  const dispatch = useDispatch();
  const [productNameInput, setProductNameInput] = useState("");
  const [productCategoryInput, setProductCategoryInput] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { setModalContent, closeModal } = useModal();
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
    const loadData = async () => {
      const handleProductCheckout = data => {
        if (data.user_checkout_id !== user?.user?.id) {
          let message = ""
          const products = data.products;

          products.forEach(product => {
            dispatch(productActions.updateProductsQuantityWhenSomeoneCheckoutThunk(product.id, product.remaining));
            if (inCartProductIds.includes(product.id)) {
              if (product.remaining > 0) {
                message += `"${product.name}" only has ${product.remaining} left!\n`;
              } else {
                message += `"${product.name}" has already sold out!\n`;
              }
            }
          });

          if (message.length > 0) {
            setModalContent(
              <NotificationModal
                message={message}
                status="alert-success"
                setTimeOut={false}
                loader={false}
              />
            );
          } else {
            closeModal();
          }
        }
      }

      const handleProductDelete = data => {
        if (data.product_owner_id !== user?.user?.id) {
          dispatch(productActions.updateProductsWhenProductIsDeletedThunk(data.product_id));

          if (inCartProductIds.includes(data.product_id)) {
            setModalContent(
              <NotificationModal
                message={`"${data.product_name}" is discontinued!! ❌`}
                status="alert-success"
                setTimeOut={false}
                loader={false}
              />
            );
          }
        }
      }

      const handleProductUpdate = data => {
        if (data.product_owner_id !== user?.user?.id) {
          dispatch(productActions.updateProductsWhenProductIsUpdatedThunk(data.product))
          if (inCartProductIds.includes(data.product.id)) {
            setModalContent(
              <NotificationModal
                message={`"${data.product.name}" just updated its information!! ❌`}
                status="alert-success"
                setTimeOut={false}
                loader={false}
              />
            );
          }
        }
      }

      socket.on("checkout", handleProductCheckout);
      socket.on("product_delete", handleProductDelete);
      socket.on("product_update", handleProductUpdate);

      await dispatch(sessionActions.restoreSession());
      await dispatch(productActions.loadProductsThunk());
      if (user?.user) {
        await dispatch(orderActions.loadOrdersThunk());
        await dispatch(bookmarkActions.loadBookmarksThunk(user.user.id));
      }
      setIsLoaded(true);
    }
    loadData();
  }, [user?.user, dispatch, inCartProductIds, setModalContent, closeModal]);

  if (!isLoaded) return <Loading />
  if (!user) closeChat();

  return (
    <div id="home-page">
      {user?.user && (
        <>
          <div className="manage-my-product-btns">
            <i className="fa-solid fa-plus" title="Add a product" onClick={showProductForm}></i>
            <i className="fa-solid fa-database" title="My products" onClick={showMyProducts}></i>
          </div>
          <CustomerServiceChatWindow
            user={user?.user}
            socket={socket}
          />
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
