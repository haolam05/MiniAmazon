import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { disabledSubmitButton, enabledSubmitButton } from "../../utils/dom";
import {
  handleProductCategoryOnChange,
  handleProductDescriptionOnChange,
  handleProductNameOnChange,
  handleProductPriceOnChange,
  handleProductQuantityOnChange,
  handlePreviewImageOnChange,
  movePreviewImageUp,
  movePreviewImageDown,
} from "../../utils/form";
import NotificationModal from "../NotificationModal";
import Loading from "../Loading";
import * as productActions from "../../redux/product";
import "./ProductForm.css";

function ProductForm({ product }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(product?.name || "");
  const [category, setCategory] = useState(product?.category || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [remaining, setRemaining] = useState(product?.remaining || 1);
  const [productImage, setProductImage] = useState(product?.product_image || "");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { setModalContent } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    disabledSubmitButton();

    setSubmitting(true);
    movePreviewImageUp();
    let data;
    if (product) {
      data = await dispatch(
        productActions.updateProductThunk(product.id, {
          name,
          category,
          description,
          price,
          remaining,
          product_image: productImage
        })
      );
    } else {
      data = await dispatch(
        productActions.createProductThunk({
          name,
          category,
          description,
          price,
          remaining,
          product_image: productImage
        })
      );
    }

    if (data?.errors) {
      enabledSubmitButton();
      setSubmitting(false);
      movePreviewImageDown();
      return setErrors(data.errors);
    }

    if (product) {
      setModalContent(<NotificationModal message="Successfully updated product!" status="alert-success" />);
    } else {
      setModalContent(<NotificationModal message="Successfully added new product!" status="alert-success" />);
    }
    enabledSubmitButton();
    movePreviewImageDown();
    setSubmitting(false);
  };

  const inputInvalid = () => {
    return (
      name.length < 4 ||
      !category.length ||
      description.length < 50 ||
      price <= 0 ||
      remaining < 1 ||
      !productImage ||
      errors.productImage
    );
  }

  return (
    <>
      <h2 className="subheading">{product ? "Edit Product" : "Create new product"}</h2>
      <form onSubmit={handleSubmit} id="product-form">
        <label>Name</label>
        <input
          type="text"
          value={name}
          placeholder="At least 4 characters"
          spellCheck={false}
          onChange={e => handleProductNameOnChange(e, "name", setName, setErrors)}
          required
        />
        {errors.name && <p className="modal-errors">{errors.name}</p>}
        <label>Category</label>
        <select
          name="categories"
          value={category}
          onChange={e => handleProductCategoryOnChange(e, "category", setCategory, setErrors)}
        >
          <option value="" hidden>Categories</option>
          <option value="Groceries">Groceries</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Health & Beauty">Health & Beauty</option>
          <option value="Handmade">Handmade</option>
        </select>
        {errors.category && <p className="modal-errors">{errors.category}</p>}
        <label>Description</label>
        <textarea
          type="text"
          value={description}
          spellCheck={false}
          placeholder="At least 50 characters"
          onChange={e => handleProductDescriptionOnChange(e, "description", setDescription, setErrors)}
          required
        />
        {errors.description && <p className="modal-errors">{errors.description}</p>}
        <label>Price (in USD)</label>
        <input
          type="number"
          step=".01"
          value={price}
          spellCheck={false}
          placeholder="Enter your price in USD"
          onChange={e => handleProductPriceOnChange(e, "price", setPrice, setErrors)}
          required
        />
        {errors.price && <p className="modal-errors">{errors.price}</p>}
        <label>Quantity</label>
        <input
          type="number"
          value={remaining}
          spellCheck={false}
          onChange={e => handleProductQuantityOnChange(e, "remaining", setRemaining, setErrors)}
          required
        />
        {errors.remaining && <p className="modal-errors">{errors.remaining}</p>}
        <label>Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => handlePreviewImageOnChange(e, "productImage", setProductImage, setErrors)}
        />
        {errors.productImage && <p className="modal-errors">{errors.productImage}</p>}
        {submitting && <Loading />}
        <img alt="preview-image" id="preview-image" className={productImage ? "" : "hidden"} src={productImage} />
        <button
          type="submit"
          className={`btn-submit ${inputInvalid() ? 'disabled' : ''}`}
          disabled={inputInvalid()}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default ProductForm;
