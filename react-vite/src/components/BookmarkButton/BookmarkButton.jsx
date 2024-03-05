function BookmarkButton({ bookmarkProductIds, product, user, createAndShowBookmarks }) {
  if (
    user &&
    !bookmarkProductIds.includes(product.id) &&
    !product.is_deleted
  ) {
    return (
      <button
        title="Bookmark this product"
        onClick={e => createAndShowBookmarks(e, product.id)}
        className="bookmark-btn"
      >
        Bookmark
      </button>
    );
  }
}

export default BookmarkButton;
