import Product from "../Product/Product";
import "./Bookmark.css";

function Bookmark({ user, bookmark, products, inCartProductIds, bookmarkProductIds }) {
  return (
    <div className="bookmark" id={`bookmark-${bookmark.id}`}>
      <Product
        product={products[bookmark.product_id]}
        user={user}
        inCartProductIds={inCartProductIds}
        bookmarkProductIds={bookmarkProductIds}
      />
      <div className="bookmark-btns">
        <div className="edit-bookmark" title="Edit bookmark"><i className="fa-solid fa-gear"></i></div>
        <div className="delete-bookmark" title="Delete bookmark"><i className="fa-solid fa-trash"></i></div>
      </div>
      <p className="bookmark-note">{bookmark.note}</p>
    </div>
  )
}

export default Bookmark;
