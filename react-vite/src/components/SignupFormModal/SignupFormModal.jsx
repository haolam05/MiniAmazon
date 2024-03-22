import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { disabledSubmitButton, enabledSubmitButton } from "../../utils/dom";
import {
  emailIsValid,
  handleEmailOnChange,
  handleFirstNameOnChange,
  handleLastNameOnChange,
  handlePasswordOnChange,
  handlePreviewImageOnChange,
  handleUsernameOnChange,
  movePreviewImageDown,
  movePreviewImageUp
} from "../../utils/form";
import NotificationModal from "../NotificationModal";
import Loading from "../Loading";
import OAUTH from "../OAUTH";
import * as sessionActions from "../../redux/session";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { setModalContent } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    disabledSubmitButton();

    if (password !== confirmPassword) {
      enabledSubmitButton();
      setSubmitting(false);
      return setErrors({ confirmPassword: "Confirm Password field must be the same as the Password field" });
    }

    setSubmitting(true);
    movePreviewImageUp(202);
    const data = await dispatch(
      sessionActions.thunkSignup({
        first_name: firstName,
        last_name: lastName,
        username,
        password,
        email,
        profile_image_url: profileImageUrl
      })
    );

    if (data?.errors) {
      enabledSubmitButton();
      setSubmitting(false);
      movePreviewImageDown(165);
      return setErrors(data.errors);
    }
    setModalContent(<NotificationModal message="You have successfully signed up!" status="alert-success" />);
    enabledSubmitButton();
    movePreviewImageDown(165);
    setSubmitting(false);
  };

  const inputInvalid = () => {
    return (
      !firstName.length ||
      !lastName.length ||
      !emailIsValid(email) ||
      username.length < 4 ||
      password.length < 6 ||
      confirmPassword.length < 6 ||
      errors.profileImageUrl
    );
  }

  return (
    <>
      <h2 className="subheading">Sign Up</h2>
      <form onSubmit={handleSubmit} id="signup-form">
        <label>First name</label>
        <input
          type="text"
          value={firstName}
          spellCheck={false}
          placeholder="Hao"
          onChange={e => handleFirstNameOnChange(e, "firstName", setFirstName, setErrors)}
          required
        />
        {errors.firstName && <p className="modal-errors">{errors.firstName}</p>}
        <label>Last name</label>
        <input
          type="text"
          value={lastName}
          spellCheck={false}
          placeholder="Lam"
          onChange={e => handleLastNameOnChange(e, "lastName", setLastName, setErrors)}
          required
        />
        {errors.lastName && <p className="modal-errors">{errors.lastName}</p>}
        <label>Email</label>
        <input
          type="text"
          value={email}
          spellCheck={false}
          placeholder="haolam@user.io"
          onChange={e => handleEmailOnChange(e, "email", setEmail, setErrors)}
          required
        />
        {errors.email && <p className="modal-errors">{errors.email}</p>}
        <label>Username</label>
        <input
          type="text"
          value={username}
          spellCheck={false}
          placeholder="At least 4 characters"
          onChange={e => handleUsernameOnChange(e, "username", setUsername, setErrors)}
          required
        />
        {errors.username && <p className="modal-errors">{errors.username}</p>}
        <label>Password</label>
        <input
          type="password"
          value={password}
          spellCheck={false}
          placeholder="At least 6 characters"
          onChange={e => handlePasswordOnChange(e, "password", setPassword, setErrors)}
          required
        />
        {errors.password && <p className="modal-errors">{errors.password}</p>}
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          placeholder="At least 6 characters"
          spellCheck={false}
          onChange={e => handlePasswordOnChange(e, "confirmPassword", setConfirmPassword, setErrors)}
          required
        />
        {errors.confirmPassword && <p className="modal-errors">{errors.confirmPassword}</p>}
        <label>Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => handlePreviewImageOnChange(e, "profileImageUrl", setProfileImageUrl, setErrors)}
        />
        {errors.profileImageUrl && <p className="modal-errors">{errors.profileImageUrl}</p>}
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
      <OAUTH text="Sign up" />
    </>
  );
}

export default SignupFormModal;
