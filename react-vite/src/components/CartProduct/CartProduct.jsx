import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getFormattedPrice, getPreviewText } from "../../utils/product";
import * as orderActions from "../../redux/order";
import "./CartProduct.css";
import Loading from "../Loading";

function CartProduct({ product, item, user }) {
  const dispatch = useDispatch();
  const { showProductDetails } = useModal();
  const [submitting, setSubmitting] = useState(false);
  const [quantityInput, setQuantityInput] = useState(item.quantity);

  const removeProductFromCart = async e => {
    e.stopPropagation();
    setSubmitting(true);
    await dispatch(orderActions.updateOrderThunk(item.order_id, product.id, 0));
    setSubmitting(false);
  }

  const updateOrder = async e => {
    e.preventDefault();
    setSubmitting(true);
    await dispatch(orderActions.updateOrderThunk(item.order_id, product.id, quantityInput));
    setSubmitting(false);
  }


  return (
    <div
      className="cart-product"
      id={`cart-product-${product.id}`}
    >
      <div className="cart-product-image">
        <img src={product.product_image} alt="cart-product-image" onClick={() => showProductDetails(product, user)} />
        {submitting && <Loading />}
        <div className="cart-product-quantity" onClick={e => e.stopPropagation()}>
          {quantityInput === 1 ? (
            <div
              className="minus"
              title="Delete product"
              onClick={removeProductFromCart}
            >
              <i className="fa-solid fa-trash"></i>
            </div>
          ) : (
            <div
              className="minus"
              title="Decrement product count"
              onClick={() => setQuantityInput(count => count - 1)}
            >
              <i className="fa-solid fa-minus"></i>
            </div>
          )}
          <div
            className="quantity"
            title="Enter desired product quantity"
          >
            <input type="number" spellCheck={false} value={quantityInput} onChange={e => +e.target.value >= 1 && setQuantityInput(+e.target.value)} />
          </div>
          <div
            className="plus"
            title="Increment product count"
            onClick={() => setQuantityInput(count => count + 1)}
          >
            <i className="fa-solid fa-plus"></i>
          </div>
          <div
            className="submit-quantity"
            title="Save"
            onClick={updateOrder}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
      </div>
      <div className="cart-product-info">
        <p className="cart-product-name">{getPreviewText(product.name)}</p>
        <div className="cart-product-price">
          <span className="dollar-sign">$</span>
          <span className="price">{getFormattedPrice(product.price)[0]}</span>
          <span className="decimal">{getFormattedPrice(product.price)[1]}</span>
        </div>
        <div className="cart-product-delete-btn" onClick={removeProductFromCart}>Delete</div>
      </div>
    </div>
  );
}

export default CartProduct;
