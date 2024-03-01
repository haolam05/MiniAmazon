import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { disabledSubmitButton, enabledSubmitButton } from "../../utils/dom";
import { emailIsValid, handleEmailOnChange, handlePasswordOnChange, handleUsernameOnChange } from "../../utils/form";
import NotificationModal from "../NotificationModal";
import * as sessionActions from "../../redux/session";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setModalContent } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    disabledSubmitButton();

    if (password !== confirmPassword) {
      enabledSubmitButton();
      return setErrors({ confirmPassword: "Confirm Password field must be the same as the Password field", });
    }

    const data = await dispatch(
      sessionActions.thunkSignup({
        email,
        username,
        password,
      })
    );

    if (data?.errors) {
      enabledSubmitButton();
      return setErrors(data.errors);
    }
    setModalContent(<NotificationModal message="You have successfully signed up!" status="alert-success" />);
    enabledSubmitButton();
  };

  const inputInvalid = () => {
    return (
      !emailIsValid(email) ||
      username.length < 4 ||
      password.length < 6 ||
      confirmPassword < 6
    );
  }

  return (
    <>
      <h2 className="subheading">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          value={email}
          spellCheck={false}
          onChange={e => handleEmailOnChange(e, "email", setEmail, setErrors)}
          required
        />
        {errors.email && <p className="modal-errors">{errors.email}</p>}
        <label>Username</label>
        <input
          type="text"
          value={username}
          spellCheck={false}
          onChange={e => handleUsernameOnChange(e, "username", setUsername, setErrors)}
          required
        />
        {errors.username && <p className="modal-errors">{errors.username}</p>}
        <label>Password</label>
        <input
          type="password"
          value={password}
          spellCheck={false}
          onChange={e => handlePasswordOnChange(e, "password", setPassword, setErrors)}
          required
        />
        {errors.password && <p className="modal-errors">{errors.password}</p>}
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          spellCheck={false}
          onChange={e => handlePasswordOnChange(e, "confirmPassword", setConfirmPassword, setErrors)}
          required
        />
        {errors.confirmPassword && <p className="modal-errors">{errors.confirmPassword}</p>}
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

export default SignupFormModal;
