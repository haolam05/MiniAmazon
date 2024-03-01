import { getFormattedPrice, getPreviewText } from "../../utils/product";
import "./Product.css";

function Product({ product }) {
  return (
    <div className="product" id="product.id">
      <div className="product-image">
        <img src={product.product_image} alt="product-image" />
      </div>
      <div className="product-price">
        <span className="dollar-sign">$</span>
        <span className="price">{getFormattedPrice(product.price)[0]}</span>
        <span className="decimal">{getFormattedPrice(product.price)[1]}</span>
      </div>
      <p className="product-name">{getPreviewText(product.name)}</p>
      <div className="product-remaining">{product.remaining} left</div>
      {/* <div className="product-description">{getPreviewText(product.description)}</div> */}
      <div className="product-btns">
        <button>Bookmark</button>
        <button>Add to cart</button>
      </div>
    </div>
  );
}

export default Product;
