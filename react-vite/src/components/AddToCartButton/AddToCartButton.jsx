function AddToCartButton({ showCart, product, user, inCartProductIds }) {
  if (
    user &&
    !inCartProductIds.includes(product.id) &&
    !product.is_deleted &&
    product.remaining > 0 &&
    user.id !== product.seller_id
  ) {
    return (
      <button
        title="Add this product to cart"
        onClick={e => showCart(e, product, user)}
        className="add-to-cart-btn"
      >
        Add to cart
      </button>
    );
  }
}

export default AddToCartButton;
