import { useState } from "react";
import { useSelector } from "react-redux";
import { toggleCart } from "../../utils/cart";
import { addOutline, removeOutline } from "../../utils/navbar";
import SessionInfo from "../SessionInfo";
import * as orderActions from "../../redux/order";
import "./NavBar.css";

function NavBar({ user }) {
  const [category, setCategory] = useState("");
  const orders = useSelector(orderActions.getOrders);
  const itemsInCart = orders.filter(order => !order.is_checkout)[0]?.items || [];

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
        />
        <div id="search-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div id="categories" title="Product categories">
        <select name="categories" value={category} onChange={e => setCategory(e.target.value)}>
          <option className="category" value="" hidden>Categories</option>
          <option className="category">All</option>
          <option className="category" value="Groceries">Groceries</option>
          <option className="category" value="Electronics">Electronics</option>
          <option className="category" value="Books">Books</option>
          <option className="category" value="Health & Beauty">Health & Beauty</option>
          <option className="category" value="Handmade">Handmade</option>
        </select>
      </div>
      <div id="cart" title="View cart" onClick={toggleCart}>
        <img src="/images/cart.png" alt="shopping-cart" />
        <span>Cart</span>
        <span id="cart-items-count">{itemsInCart.length}</span>
      </div>
      <div id="bookmark" title="View bookmarks">
        <i className="fa-solid fa-bookmark"></i>
      </div>
      <SessionInfo user={user} />
    </div>
  );
}

export default NavBar;
