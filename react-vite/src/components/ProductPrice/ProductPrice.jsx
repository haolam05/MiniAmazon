import { getFormattedPrice } from "../../utils/product";

function ProductPrice({ product, cls = "product-price" }) {
  return (
    <div className={cls}>
      <span className="dollar-sign">$</span>
      <span className="price">{getFormattedPrice(product.price)[0]}</span>
      <span className="decimal">{getFormattedPrice(product.price)[1]}</span>
    </div>
  );
}

export default ProductPrice;
