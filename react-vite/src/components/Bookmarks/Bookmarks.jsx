import Bookmark from "../Bookmark";
import "./Bookmarks.css";

function Bookmarks({ user, products, inCartProductIds, bookmarks, bookmarkProductIds }) {
  return (<>
    <h2 className="subheading">My Bookmarks</h2>
    {!bookmarks.length && <p>You don&apos;t have any bookmarks yet!</p>}
    <div id="bookmarks">
      {bookmarks
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(bookmark => (
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
