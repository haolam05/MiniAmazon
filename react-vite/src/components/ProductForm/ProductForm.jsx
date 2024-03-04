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
} from "../../utils/form";
import NotificationModal from "../NotificationModal";
import Loading from "../Loading";
import "./ProductForm.css";

function ProductForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [remaining, setRemaining] = useState(1);
  const [productImage, setProductImage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { setModalContent } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    disabledSubmitButton();

    setSubmitting(true);
    // movePreviewImageUp();
    // const data = await dispatch(
    //   sessionActions.thunkSignup({
    //     first_name: firstName,
    //     last_name: lastName,
    //     username,
    //     password,
    //     email,
    //     profile_image_url: profileImageUrl
    //   })
    // );

    // if (data?.errors) {
    //   enabledSubmitButton();
    //   setSubmitting(false);
    //   movePreviewImageDown();
    //   return setErrors(data.errors);
    // }
    // setModalContent(<NotificationModal message="You have successfully signed up!" status="alert-success" />);
    enabledSubmitButton();
    // movePreviewImageDown();
    // setSubmitting(false);
  };

  const inputInvalid = () => {
    return (
      name.length < 4 ||
      !category.length ||
      description.length < 50 ||
      price <= 0 ||
      remaining < 1 ||
      errors.productImage
    );
  }

  return (
    <>
      <h2 className="subheading">Create new product</h2>
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
        <img alt="preview-image" id="preview-image" className="hidden" />
        <button
          type="submit"
          className={`btn-submit ${inputInvalid() ? 'disabled' : ''}`}
          disabled={inputInvalid()}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default ProductForm;
