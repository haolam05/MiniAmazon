import Product from "../Product/Product";

function Bookmark({ user, bookmark, products, inCartProductIds, bookmarkProductIds }) {
  return (
    <div className="bookmark" id={`bookmark-${bookmark.id}`}>
      <Product
        product={products[bookmark.product_id]}
        user={user}
        inCartProductIds={inCartProductIds}
        bookmarkProductIds={bookmarkProductIds}
      />
    </div>
  )
}

export default Bookmark;
