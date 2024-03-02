import { useState } from "react";
import { getFormattedPrice, getPreviewText } from "../../utils/product";
import "./CartProduct.css";

function CartProduct({ product, quantity }) {
  const [quantityInput, setQuantityInput] = useState(quantity);

  const removeProductFromCart = e => {
    e.stopPropagation();
  }

  const updateOrder = e => {
    e.preventDefault();
  }


  return (
    <div
      className="cart-product"
      id={product.id}
    >
      <div className="cart-product-image">
        <img src={product.product_image} alt="cart-product-image" />
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
            <input type="number" spellCheck={false} value={quantityInput} onChange={e => setQuantityInput(+e.target.value)} />
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
