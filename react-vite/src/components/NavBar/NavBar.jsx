import { addOutline, removeOutline } from "../../utils/navbar";
import "./NavBar.css";

function NavBar() {
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
      <div id="categories">
        <select name="categories">
          <option value="" disabled selected hidden>Categories</option>
          <option value="All">All</option>
          <option value="Groceries">Groceries</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Health & Beauty">Health & Beauty</option>
          <option value="Handmade">Handmade</option>
        </select>
      </div>
      <div id="cart">
        <img src="/images/cart.png" alt="shopping-cart" />
        <span>Cart</span>
        <span id="cart-items-count">0</span>
      </div>
    </div>
  );
}

export default NavBar;
