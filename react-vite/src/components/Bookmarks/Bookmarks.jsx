import Bookmark from "../Bookmark";
import "./Bookmarks.css";

function Bookmarks({ user, products, inCartProductIds, bookmarks, bookmarkProductIds }) {
  return (<>
    <h2 className="subheading">My Bookmarks</h2>
    <div id="bookmarks">
      {bookmarks.map(bookmark => (
        <Bookmark
          key={bookmark.id}
          user={user}
          bookmark={bookmark}
          products={products}
          inCartProductIds={inCartProductIds}
          bookmarkProductIds={bookmarkProductIds}
        />
      ))}
    </div>
  </>);
}

export default Bookmarks;
