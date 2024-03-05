import { useDispatch } from "react-redux";
import { useSecondaryModal } from "../../context/SecondaryModal";
import { getPreviewText } from "../../utils/product";
import ConfirmDeleteFormModal from "../ConfirmDeleteModal";
import ProductForm from "../ProductForm";
import NotificationModal from "../NotificationModal";
import ProductBookmark from "../ProductBookmark";
import ProductRemaining from "../ProductRemaining";
import ProductPrice from "../ProductPrice";
import * as productActions from "../../redux/product";

function MyProduct({ product, user, bookmarkProductIds, inCartProductIds, itemsInCart }) {
  const dispatch = useDispatch();
  const { setModalContent, closeModal, showProductDetails } = useSecondaryModal();

  const showEditProductForm = () => setModalContent(<ProductForm product={product} />);

  const deleteProduct = async () => {
    const data = await dispatch(productActions.deleteProductThunk(product.id, itemsInCart));
    if (data?.errors) {
      setModalContent(
        <NotificationModal
          message={data.errors.message}
          status="modal-errors"
          secondaryModal={true}
        />
      );
    } else {
      setModalContent(
        <NotificationModal
          message="Successfully deleted product!"
          status="alert-success"
          secondaryModal={true}
        />
      );
    }
  }

  const showConfirmDeleteProduct = () => {
    setModalContent(
      <ConfirmDeleteFormModal
        text="Are you sure you want to delete this product?"
        deleteCb={deleteProduct}
        cancelDeleteCb={closeModal}
      />
    );
  }

  return (
    <div
      className="product cursor-normal"
      id={`product-${product.id}`}
      onClick={e => e.stopPropagation()}
    >
      <div className="product-image cursor-pointer" onClick={() => showProductDetails(product, user, inCartProductIds, bookmarkProductIds)}>
        <img src={product.product_image} alt="product-image" />
      </div>
      <ProductPrice product={product} />
      <p className="product-name">{getPreviewText(product.name)}</p>
      <ProductRemaining product={product} />
      <ProductBookmark
        user={user}
        bookmarkProductIds={bookmarkProductIds}
        product={product}
      />
      {!product.is_deleted && (
        <div className="product-btns">
          <button
            title="Edit this product"
            onClick={showEditProductForm}
            className="bookmark-btn"
          >
            Edit
          </button>
          <button
            title="Delete this product"
            onClick={showConfirmDeleteProduct}
            className="add-to-cart-btn"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default MyProduct;
