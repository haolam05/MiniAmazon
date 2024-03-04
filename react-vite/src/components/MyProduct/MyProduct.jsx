import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getFormattedPrice, getPreviewText } from "../../utils/product";
import ConfirmDeleteFormModal from "../ConfirmDeleteModal";
import ProductForm from "../ProductForm";
import NotificationModal from "../NotificationModal";
import * as productActions from "../../redux/product";

function MyProduct({ product, user, inCartProductIds, bookmarkProductIds }) {
  const dispatch = useDispatch();
  const { setModalContent, closeModal } = useModal();

  const showEditProductForm = () => setModalContent(<ProductForm product={product} />);

  const deleteProduct = async () => {
    const data = false;//await dispatch(productActions.deleteProductThunk(product.id));
    if (data?.errors) {
      setModalContent(
        <NotificationModal
          message={data.errors.message}
          status="modal-errors"
        />
      );
    } else {
      setModalContent(
        <NotificationModal
          message="Successfully updated product!"
          status="alert-success"
        />
      );
    }
  }

  const showConfirmDeleteProduct = () => setModalContent(
    <ConfirmDeleteFormModal
      text="Are you sure you want to delete this product?"
      deleteCb={deleteProduct}
      cancelDeleteCb={closeModal}
    />
  );

  return (
    <div
      className="product"
      id={`product-${product.id}`}
      onClick={e => e.stopPropagation()}
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
      <div className="product-remaining">{product.remaining > 0 ? `${product.remaining} left` : "Sold out"}</div>
      {user && bookmarkProductIds.includes(product.id) && (
        <div className="product-bookmark" title="This product has already been bookmarked">
          <i className="fa-solid fa-bookmark"></i>
        </div>
      )}
      <div className="product-btns">
        {user && !bookmarkProductIds.includes(product.id) && (
          <button
            title="Edit this product"
            onClick={showEditProductForm}
            className="bookmark-btn"
          >
            Edit
          </button>
        )}
        {user && !inCartProductIds.includes(product.id) && product.remaining > 0 && (
          <button
            title="Delete this product"
            onClick={showConfirmDeleteProduct}
            className="add-to-cart-btn"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default MyProduct;
