function ProductRemaining({ product }) {
  return (
    <div className={`product-remaining${product.is_deleted ? " red" : ""}`}>{
      product.is_deleted ? "Discontinued" : (product.remaining > 0 ? `${product.remaining} left` : "Sold out")
    }</div>
  );
}

export default ProductRemaining;
