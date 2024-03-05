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

function MyProduct({ products, product, user, bookmarkProductIds, inCartProductIds, itemsInCart }) {
  const dispatch = useDispatch();
  const { showProductDetails } = useSecondaryModal();
  const { setSecondaryModalContent, closeSecondaryModal } = useSecondaryModal();

  const showEditProductForm = () => {
    setSecondaryModalContent(
      <ProductForm
        product={product}
        products={products}
        user={user}
        bookmarkProductIds={bookmarkProductIds}
        inCartProductIds={inCartProductIds}
        itemsInCart={itemsInCart}
      />
    );
  };

  const deleteProduct = async () => {
    const data = await dispatch(productActions.deleteProductThunk(product.id, itemsInCart));
    if (data?.errors) {
      setSecondaryModalContent(
        <NotificationModal
          message={data.errors.message}
          status="modal-errors"
          secondaryModal={true}
        />
      );
    } else {
      setSecondaryModalContent(
        <NotificationModal
          message="Successfully deleted product!"
          status="alert-success"
          secondaryModal={true}
        />
      );
    }
  }

  const showConfirmDeleteProduct = () => {
    setSecondaryModalContent(
      <ConfirmDeleteFormModal
        text="Are you sure you want to delete this product?"
        deleteCb={deleteProduct}
        cancelDeleteCb={closeSecondaryModal}
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
