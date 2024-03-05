function BookmarkButton({ bookmarkProductIds, product, user, createAndShowBookmarks }) {
  if (
    user &&
    !bookmarkProductIds.includes(product.id) &&
    !product.is_deleted
  ) {
    return (
      <button
        title="Bookmark this product"
        onClick={createAndShowBookmarks}
        className="bookmark-btn"
      >
        Bookmark
      </button>
    );
  }
}

export default BookmarkButton;
