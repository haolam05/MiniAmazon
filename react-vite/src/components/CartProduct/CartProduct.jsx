import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getPreviewText } from "../../utils/product";
import Loading from "../Loading";
import ProductBookmark from "../ProductBookmark";
import ProductPrice from "../ProductPrice";
import * as orderActions from "../../redux/order";
import "./CartProduct.css";

function CartProduct({ product, item, user, inCartProductIds, bookmarkProductIds }) {
  const dispatch = useDispatch();
  const { showProductDetails } = useModal();
  const [submitting, setSubmitting] = useState(false);
  const [quantityInput, setQuantityInput] = useState(product.remaining <= item.quantity ? product.remaining : item.quantity);
  const [errors, setErrors] = useState({})
  const [unsaveChanges, setUnsaveChanges] = useState(false);

  useEffect(() => {
    // for websocket - update product quantity immediately when someone checkout
    if (product.remaining < +quantityInput && product.remaining > 0) {
      setQuantityInput(product.remaining);
      setErrors({ "quantity": "None remaining ❌" });
      dispatch(orderActions.updateOrderThunk(item.order_id, product.id, product.remaining));
    }
  }, [dispatch, product.id, product.remaining, item, quantityInput]);

  const removeProductFromCart = async e => {
    e.stopPropagation();
    setSubmitting(true);
    await dispatch(orderActions.updateOrderThunk(item.order_id, product.id, 0));
    setSubmitting(false);
  }

  const updateOrder = async e => {
    e.preventDefault();
    setErrors({ "quantity": "" });
    setUnsaveChanges(false);
    setSubmitting(true);
    await dispatch(orderActions.updateOrderThunk(item.order_id, product.id, quantityInput));
    setSubmitting(false);
  }

  const handleQuantityOnChange = e => {
    if (submitting) return;

    const quantity = +e.target.value;
    if (quantity > product.remaining) {
      setQuantityInput(product.remaining);
      setUnsaveChanges(true);
      return setErrors({ "quantity": "None remaining ❌" });
    }
    if (quantity >= 1) {
      setUnsaveChanges(true);
      setQuantityInput(quantity);
      setErrors({ "quantity": "" });
    }
  }

  const handleIncrement = () => {
    if (submitting) return;

    if (quantityInput + 1 > product.remaining) {
      setErrors({ "quantity": "None remaining ❌" });
    } else {
      setUnsaveChanges(true);
      setQuantityInput(count => count + 1);
    }
  }

  const handleDecrement = () => {
    if (submitting) return;

    if (quantityInput - 1 <= product.remaining) {
      setErrors({ "quantity": "" });
    }
    setUnsaveChanges(true);
    setQuantityInput(count => count - 1);
  }

  return (
    <div
      className="cart-product cursor-normal"
      id={`cart-product-${product.id}`}
    >
      <div className="cart-product-image">
        <img
          src={product.product_image}
          alt="cart-product-image"
          className="cursor-pointer"
          onClick={() => showProductDetails(product, user, inCartProductIds, bookmarkProductIds)}
        />
        {submitting && <Loading />}
        {unsaveChanges && <p className="unsave-changes">Unsave changes <i className="fa-solid fa-circle"></i></p>}
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
              className="minus cursor-pointer"
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
            className="plus cursor-pointer"
            title="Increment product count"
            onClick={handleIncrement}
          >
            <i className="fa-solid fa-plus"></i>
          </div>
          <div
            className="submit-quantity cursor-pointer"
            title="Save"
            onClick={updateOrder}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <div className="cart-product-remaining">{product.remaining - quantityInput} left</div>
        <ProductBookmark
          user={user}
          bookmarkProductIds={bookmarkProductIds}
          product={product}
          cls="cart-product-bookmark"
        />
      </div>
      <div className="cart-product-info">
        <p className="cart-product-name">{getPreviewText(product.name)}</p>
        <ProductPrice product={product} cls="cart-product-price" />
        <div className="cart-product-delete-btn cursor-pointer" onClick={removeProductFromCart}>Delete</div>
      </div>
    </div>
  );
}

export default CartProduct;
