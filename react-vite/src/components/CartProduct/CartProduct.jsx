import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getFormattedPrice, getPreviewText } from "../../utils/product";
import Loading from "../Loading";
import * as orderActions from "../../redux/order";
import "./CartProduct.css";

function CartProduct({ product, item, user }) {
  const dispatch = useDispatch();
  const { showProductDetails } = useModal();
  const [submitting, setSubmitting] = useState(false);
  const [quantityInput, setQuantityInput] = useState(item.quantity);
  const [productRemaining, setProductRemaining] = useState(product.remaining);
  const [errors, setErrors] = useState({})

  const removeProductFromCart = async e => {
    e.stopPropagation();
    setSubmitting(true);
    await dispatch(orderActions.updateOrderThunk(item.order_id, product.id, 0));
    setSubmitting(false);
  }

  const updateOrder = async e => {
    e.preventDefault();
    setErrors({ "quantity": "" });
    setSubmitting(true);
    await dispatch(orderActions.updateOrderThunk(item.order_id, product.id, quantityInput));
    setSubmitting(false);
  }

  const handleQuantityOnChange = e => {
    if (submitting) return;

    const quantity = +e.target.value;
    if (quantity > productRemaining) {
      setQuantityInput(productRemaining);
      return setErrors({ "quantity": "None remaining ❌" });
    }
    if (quantity >= 1) {
      setQuantityInput(quantity);
      setErrors({ "quantity": "" });
    }
  }

  const handleIncrement = () => {
    if (submitting) return;

    if (quantityInput + 1 > productRemaining) {
      setErrors({ "quantity": "None remaining ❌" });
    } else {
      setQuantityInput(count => count + 1);
    }
  }

  const handleDecrement = () => {
    if (submitting) return;

    if (quantityInput - 1 <= productRemaining) {
      setErrors({ "quantity": "" });
    }
    setQuantityInput(count => count - 1);
  }

  return (
    <div
      className="cart-product"
      id={`cart-product-${product.id}`}
    >
      <div className="cart-product-image">
        <img src={product.product_image} alt="cart-product-image" onClick={() => showProductDetails(product, user)} />
        {submitting && <Loading />}
        {errors.quantity && <p>{errors.quantity}</p>}
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
              onClick={handleDecrement}
            >
              <i className="fa-solid fa-minus"></i>
            </div>
          )}
          <div
            className="quantity"
            title="Enter desired product quantity"
          >
            <input
              type="number"
              spellCheck={false}
              value={quantityInput}
              onChange={handleQuantityOnChange}
            />
          </div>
          <div
            className="plus"
            title="Increment product count"
            onClick={handleIncrement}
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
        <div className="cart-product-remaining">{productRemaining - quantityInput} left</div>
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
