import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { getFormattedPrice, getPreviewText } from "../../utils/product";
import ProductDetails from "../ProductDetails";
import LoginFormModal from "../LoginFormModal";
import * as orderActions from "../..//redux/order";
import "./Product.css";
import NotificationModal from "../NotificationModal";

function Product({ product, user }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  const showBookmarks = e => {
    e.stopPropagation();
  }

  const showCart = async e => {
    e.stopPropagation();
    if (!user) {
      return setModalContent(<LoginFormModal />);
    }
    const data = await dispatch(orderActions.createOrderThunk(product));
    if (data?.message) {
      setModalContent(<NotificationModal message={data.message} status="modal-errors" />)
    }
  }

  const showProductDetails = () => {
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
      id={`product-${product.id}`}
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
