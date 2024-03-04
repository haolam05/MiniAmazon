import { turnOnGreenBoxShadow, turnOnOffAllBoxShadow, turnOnRedBoxShadow } from "./dom";

export const emailIsValid = email => {
  const symbolIndex = email.indexOf("@");
  const dotIndex = email.indexOf(".");

  const parts1 = email.split("@");
  const parts2 = email.split(".");

  if (                                // good email : username@mail_server.domain
    symbolIndex < 0 ||                // @ not found
    dotIndex < 0 ||                   // . not found
    parts1.length !== 2 ||            // 1+ @
    symbolIndex === 0 ||              // missing username
    symbolIndex + 1 === dotIndex ||   // missing mail_server
    symbolIndex > dotIndex ||         // @ comes after .
    parts2.length !== 2 ||            // 1+ .
    dotIndex === email.length - 1     // domain not found
  ) {
    return false;
  }

  return true;
}

export const handleEmailOnChange = (e, key, setEmail, setErrors) => {
  const goodEmail = "(ex: username@mail_server.domain)";
  const element = e.target;
  const value = element.value;

  setEmail(value);

  if (!value.length) {
    turnOnOffAllBoxShadow(e);
    return setErrors(errors => ({ ...errors, [key]: "" }));
  }

  turnOnRedBoxShadow(e);
  const symbolIndex = value.indexOf("@");
  const dotIndex = value.indexOf(".");

  if (symbolIndex < 0) {
    return setErrors(errors => ({ ...errors, [key]: "Missing \"@\" " + goodEmail }));
  }

  if (dotIndex < 0) {
    return setErrors(errors => ({ ...errors, [key]: "Missing \".\" " + goodEmail }));
  }

  let parts = value.split("@");
  if (parts.length != 2) {
    return setErrors(errors => ({ ...errors, [key]: "Only 1 \"@\" is allowed " + goodEmail }));
  }

  if (symbolIndex === 0) {
    return setErrors(errors => ({ ...errors, [key]: "Missing username " + goodEmail }));
  }

  if (symbolIndex + 1 === dotIndex) {
    return setErrors(errors => ({ ...errors, [key]: "Missing mail server " + goodEmail }));
  }

  if (symbolIndex > dotIndex) {
    return setErrors(errors => ({ ...errors, [key]: "\"@\" must come before \".\" " + goodEmail }));
  }

  parts = value.split(".");
  if (parts.length != 2) {
    return setErrors(errors => ({ ...errors, [key]: "Only 1 \".\" is allowed " + goodEmail }));
  }

  if (dotIndex === value.length - 1) {
    return setErrors(errors => ({ ...errors, [key]: "Missing domain " + goodEmail }));
  }

  turnOnGreenBoxShadow(e);
  return setErrors(errors => ({ ...errors, [key]: "" }));
}

export const handlePasswordOnChange = (e, key, setPassword, setErrors) => {
  setPassword(e.target.value);

  if (!e.target.value.length) {
    turnOnOffAllBoxShadow(e);
    return setErrors(errors => ({ ...errors, [key]: "" }));
  }

  turnOnRedBoxShadow(e);
  if (e.target.value.length < 6) {
    return setErrors(errors => ({ ...errors, [key]: "Must have at least 6 characters" }));
  }

  turnOnGreenBoxShadow(e);
  return setErrors(errors => ({ ...errors, [key]: "" }));
}

export const handleUsernameOnChange = (e, key, setUsername, setErrors) => {
  setUsername(e.target.value);

  if (!e.target.value.length) {
    turnOnOffAllBoxShadow(e);
    return setErrors(errors => ({ ...errors, [key]: "" }));
  }

  if (e.target.value.length < 4) {
    return setErrors(errors => ({ ...errors, [key]: "Must have at least 4 characters" }));
  }

  turnOnGreenBoxShadow(e);
  return setErrors(errors => ({ ...errors, [key]: "" }));
}

export const handleFirstNameOnChange = (e, key, setFirstName, setErrors) => {
  setFirstName(e.target.value);

  if (!e.target.value.length) {
    turnOnRedBoxShadow(e);
    return setErrors(errors => ({ ...errors, [key]: "This field is required" }));
  }

  turnOnGreenBoxShadow(e);
  return setErrors(errors => ({ ...errors, [key]: "" }));
}

export const handleLastNameOnChange = (e, key, setLastName, setErrors) => {
  setLastName(e.target.value);

  if (!e.target.value.length) {
    turnOnRedBoxShadow(e);
    return setErrors(errors => ({ ...errors, [key]: "This field is required" }));
  }

  turnOnGreenBoxShadow(e);
  return setErrors(errors => ({ ...errors, [key]: "" }));
}

export const handleNoteOnChange = (e, key, setNote, setErrors) => {
  setNote(e.target.value);

  if (!e.target.value.length) {
    turnOnRedBoxShadow(e);
    return setErrors(errors => ({ ...errors, [key]: "This field is required" }));
  }

  turnOnGreenBoxShadow(e);
  return setErrors(errors => ({ ...errors, [key]: "" }));
}

export const handleReviewOnChange = (e, key, setReview, setErrors) => {
  setReview(e.target.value);

  if (!e.target.value.length) {
    turnOnRedBoxShadow(e);
    return setErrors(errors => ({ ...errors, [key]: "This field is required" }));
  }

  turnOnGreenBoxShadow(e);
  return setErrors(errors => ({ ...errors, [key]: "" }));
}

export const handleProductNameOnChange = (e, key, setName, setErrors) => {
  setName(e.target.value);

  if (e.target.value.length < 4) {
    turnOnRedBoxShadow(e);
    return setErrors(errors => ({ ...errors, [key]: "Must have at least 4 characters" }));
  }

  turnOnGreenBoxShadow(e);
  return setErrors(errors => ({ ...errors, [key]: "" }));
}

export const handleProductDescriptionOnChange = (e, key, setDescription, setErrors) => {
  setDescription(e.target.value);

  if (e.target.value.length < 50) {
    turnOnRedBoxShadow(e);
    return setErrors(errors => ({ ...errors, [key]: "Must have at least 50 characters" }));
  }

  turnOnGreenBoxShadow(e);
  return setErrors(errors => ({ ...errors, [key]: "" }));
}

export const handleProductPriceOnChange = (e, key, setPrice, setErrors) => {
  setPrice(+e.target.value);

  if (+e.target.value <= 0) {
    turnOnRedBoxShadow(e);
    return setErrors(errors => ({ ...errors, [key]: "Must be greater than 0" }));
  }

  turnOnGreenBoxShadow(e);
  return setErrors(errors => ({ ...errors, [key]: "" }));
}

export const handleProductQuantityOnChange = (e, key, setQuantity, setErrors) => {
  setQuantity(+e.target.value);

  if (+e.target.value < 1) {
    turnOnRedBoxShadow(e);
    return setErrors(errors => ({ ...errors, [key]: "Must be greater than 0" }));
  }

  turnOnGreenBoxShadow(e);
  return setErrors(errors => ({ ...errors, [key]: "" }));
}

export const handleProductCategoryOnChange = (e, key, setCategory, setErrors) => {
  const allowedCategories = ["Groceries", "Electronics", "Books", "Beauty & Health", "Handmade"];
  setCategory(e.target.value);

  if (!allowedCategories.includes(e.target.value)) {
    turnOnRedBoxShadow(e);
    return setErrors(errors => ({ ...errors, [key]: `Only [${allowedCategories}] are allowed` }));
  }

  turnOnGreenBoxShadow(e);
  return setErrors(errors => ({ ...errors, [key]: "" }));
}

export const handlePreviewImageOnChange = (e, key, setImageUrl, setErrors) => {
  const previewImage = document.getElementById('preview-image');
  const file = e.target.files[0];
  const size = file.size;

  previewImage.classList.add("hidden");

  turnOnRedBoxShadow(e);
  if (size > 10 * 10 ** 6) {
    return setErrors({ [key]: "File size must not be larger than 10MB." });
  }

  if (!isImageValid(file.name)) {
    return setErrors({ [key]: "Only .png, .jpg, .jpeg, .gif are allowed" });
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = event => {
    previewImage.src = event.target.result;
    previewImage.classList.remove("hidden");
  }

  turnOnGreenBoxShadow(e);
  setImageUrl(file);
  setErrors({ profileImageUrl: "" });
}

const isImageValid = imageName => {
  if (!imageName.length) return false;
  const allowedExtensions = ["png", "jpg", "jpeg", "gif"];
  const imageParts = imageName.split(".");
  return imageParts && imageParts[1] && allowedExtensions.includes(imageParts[1].toLowerCase());
}

export const movePreviewImageUp = (amt = 119) => {
  const previewImage = document.getElementById('preview-image');
  if (previewImage) previewImage.style.bottom = `${amt}px`;
}

export const movePreviewImageDown = (amt = 83) => {
  const previewImage = document.getElementById('preview-image');
  if (previewImage) previewImage.style.bottom = `${amt}px`;
}
