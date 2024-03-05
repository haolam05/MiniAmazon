function ProductBookmark({ user, bookmarkProductIds, product, cls = "product-bookmark" }) {
  if (user && bookmarkProductIds.includes(product.id)) {
    return (
      <div className={cls} title="This product has already been bookmarked">
        <i className="fa-solid fa-bookmark"></i>
      </div>
    );
  }
}

export default ProductBookmark;
