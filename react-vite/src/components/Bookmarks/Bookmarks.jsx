import Bookmark from "../Bookmark";

function Bookmarks({ user, products, inCartProductIds, bookmarks }) {
  return (<>
    <h2 className="subheading">My Bookmarks</h2>
    <div id="bookmarks">
      {/* {bookmarks.map(bookmark => <Bookmark key={bookmark.id} />)} */}
    </div>
  </>);
}

export default Bookmarks;
