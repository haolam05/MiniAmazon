import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { toggleCart } from "../../utils/cart";
import { toggleChat } from "../../utils/chat";
import { addOutline, removeOutline } from "../../utils/navbar";
import Bookmarks from "../Bookmarks";
import SessionInfo from "../SessionInfo";
import * as orderActions from "../../redux/order";
import "./NavBar.css";

function NavBar({ user, products, inCartProductIds, bookmarks, bookmarkProductIds, productCategoryInput, setProductCategoryInput, productNameInput, setProductNameInput }) {
  const { setModalContent, closeModal } = useModal();
  const orders = useSelector(orderActions.getOrders);
  const itemsInCart = orders.filter(order => !order.is_checkout)[0]?.items || [];

  const toggleBookmarks = () => {
    const bookmarks = document.querySelector("#bookmarks");
    if (bookmarks) {
      closeModal();
    } else {
      showBookmarks();
    }
  }

  const showBookmarks = () => {
    setModalContent(
      <Bookmarks
        user={user}
        products={products}
        inCartProductIds={inCartProductIds}
        bookmarks={bookmarks}
        bookmarkProductIds={bookmarkProductIds}
      />
    );
  }

  return (
    <div id="navbar">
      <div id="logo">
        <img src="/images/logo.png" alt="logo" />
      </div>
      <div id="searchbox" className="searchbox">
        <input
          type="text"
          placeholder="Search MiniAmazon"
          onFocus={addOutline}
          onBlur={removeOutline}
          value={productNameInput}
          onChange={e => setProductNameInput(e.target.value)}
        />
        <div id="search-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div id="categories" title="Product categories">
        <select name="categories" value={productCategoryInput} onChange={e => setProductCategoryInput(e.target.value)}>
          <option className="category" value="">All Categories</option>
          <option className="category" value="Groceries">Groceries</option>
          <option className="category" value="Electronics">Electronics</option>
          <option className="category" value="Books">Books</option>
          <option className="category" value="Health & Beauty">Health & Beauty</option>
          <option className="category" value="Handmade">Handmade</option>
        </select>
      </div>
      {user && (
        <>
          <div id="cart" title="View cart" onClick={toggleCart}>
            <img src="/images/cart.png" alt="shopping-cart" />
            <span>Cart</span>
            <span id="cart-items-count">{itemsInCart.length}</span>
          </div>
          <div id="bookmark" title="View bookmarks" onClick={toggleBookmarks}>
            <i className="fa-solid fa-bookmark"></i>
          </div>
          <div id="customer-service-chat" onClick={toggleChat}>
            <i className="fa-solid fa-robot" title="Customer service live chat"></i>
          </div>
        </>
      )}
      <SessionInfo user={user} />
    </div>
  );
}

export default NavBar;
