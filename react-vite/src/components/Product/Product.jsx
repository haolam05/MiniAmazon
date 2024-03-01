import { useModal } from "../../context/Modal";
import { getFormattedPrice, getPreviewText } from "../../utils/product";
import ProductDetails from "../ProductDetails";
import "./Product.css";

function Product({ product }) {
  const { setModalContent } = useModal();

  const showBookmarks = e => {
    e.preventDefault();
    e.stopPropagation();
  }

  const showCart = e => {
    e.preventDefault();
    e.stopPropagation();
  }

  const showProductDetails = e => {
    e.preventDefault();
    setModalContent(
      <ProductDetails
        product={product}
        showBookmarks={showBookmarks}
        showCart={showCart}
      />
    );
  }

  return (
    <div
      className="product"
      id="product.id"
      title="Click to view product details"
      onClick={showProductDetails}
    >
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
      <div className="product-btns">
        <button title="Bookmark this product" onClick={showBookmarks}>Bookmark</button>
        <button title="Add this product to cart" onClick={showCart}>Add to cart</button>
      </div>
    </div>
  );
}

export default Product;
