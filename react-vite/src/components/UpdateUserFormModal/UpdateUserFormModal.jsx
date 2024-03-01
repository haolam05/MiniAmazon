import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { disabledSubmitButton, enabledSubmitButton } from "../../utils/dom";
import {
  handleFirstNameOnChange,
  handleLastNameOnChange,
  handlePasswordOnChange,
  handleProfileImageUrlOnChange,
  movePreviewImageDown,
  movePreviewImageUp
} from "../../utils/form";
import Loading from "../Loading";
import NotificationModal from "../NotificationModal";
import * as sessionActions from "../../redux/session";

function UpdateUserFormModal({ user }) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [profileImageUrl, setProfileImageUrl] = useState(user.profile_image_url || "");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { setModalContent } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    disabledSubmitButton();

    setSubmitting(true);
    movePreviewImageUp();
    const data = await dispatch(
      sessionActions.updateUserThunk({
        first_name: firstName,
        last_name: lastName,
        profile_image_url: profileImageUrl,
        email: user.email,
        username: user.username,
        password,
      })
    );

    if (data?.errors) {
      enabledSubmitButton();
      setSubmitting(false);
      movePreviewImageDown();
      return setErrors(data.errors);
    }

    setModalContent(<NotificationModal message="You have successfully updated your account!" status="alert-success" />);
    setSubmitting(false);
    movePreviewImageDown();
    enabledSubmitButton();
  };

  const inputInvalid = () => {
    return (
      !firstName.length ||
      !lastName.length ||
      password.length < 6 ||
      errors.profileImageUrl
    );
  }

  if (!user) return;

  return (
    <>
      <h2 className="subheading">Update Profile</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>First Name</label>
        <input
          type="text"
          spellCheck={false}
          value={firstName}
          onChange={e => handleFirstNameOnChange(e, "firstName", setFirstName, setErrors)}
          required
        />
        {errors.firstName && <p className="modal-errors">{errors.firstName}</p>}
        <label>Last Name</label>
        <input
          type="text"
          spellCheck={false}
          value={lastName}
          onChange={e => handleLastNameOnChange(e, "lastName", setLastName, setErrors)}
          required
        />
        {errors.lastName && <p className="modal-errors">{errors.lastName}</p>}
        <label>Email</label>
        <input
          type="text"
          spellCheck={false}
          value={user.email}
          className="disabled"
          disabled
        />
        {errors.email && <p className="modal-errors">{errors.email}</p>}
        <label>Username</label>
        <input
          type="text"
          spellCheck={false}
          value={user.username}
          className="disabled"
          disabled
        />
        {errors.username && <p className="modal-errors">{errors.username}</p>}
        <label>Password</label>
        <input
          type="password"
          spellCheck={false}
          value={password}
          onChange={e => handlePasswordOnChange(e, "password", setPassword, setErrors)}
          required
        />
        {errors.password && <p className="modal-errors">{errors.password}</p>}
        <label>Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => handleProfileImageUrlOnChange(e, "profileImageUrl", setProfileImageUrl, setErrors)}
        />
        {errors.profileImageUrl && <p className="modal-errors">{errors.profileImageUrl}</p>}
        {submitting && <Loading />}
        <img
          alt="preview-image"
          id="preview-image"
          src={user.profile_image_url}
          className={profileImageUrl ? "" : "hidden"}
        />
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

export default UpdateUserFormModal;
