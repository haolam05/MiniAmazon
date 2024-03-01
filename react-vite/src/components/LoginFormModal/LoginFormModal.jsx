import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { disabledSubmitButton, enabledSubmitButton } from "../../utils/dom";
import { emailIsValid, handleEmailOnChange, handlePasswordOnChange } from "../../utils/form";
import NotificationModal from "../NotificationModal";
import Loading from "../Loading";
import * as sessionActions from "../../redux/session";
import "./LoginFormModal.css"

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { setModalContent } = useModal();

  const handleSubmit = async (e, loginAsDemoUser = false) => {
    e.preventDefault();
    disabledSubmitButton();

    let data;

    setSubmitting(true);
    if (loginAsDemoUser) {
      data = await dispatch(
        sessionActions.thunkLogin({
          email: "haolam@user.io",
          password: "password",
        })
      );
    } else {
      data = await dispatch(
        sessionActions.thunkLogin({
          email,
          password,
        })
      );
    }

    if (data?.errors) {
      enabledSubmitButton();
      setSubmitting(false);
      return setErrors(data.errors);
    }
    setModalContent(<NotificationModal message="You have successfully logged in!" status="alert-success" />);
    enabledSubmitButton();
    setSubmitting(false);
  };

  const inputInvalid = () => {
    return (
      !emailIsValid(email) ||
      password.length < 6
    );
  }

  return (
    <>
      <h2 className="subheading">Log In</h2>
      <form onSubmit={handleSubmit}>
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
        <label>Password</label>
        <input
          type="password"
          value={password}
          spellCheck={false}
          placeholder="At least 6 characters"
          onChange={e => handlePasswordOnChange(e, "password", setPassword, setErrors)}
          required
        />
        {errors && <p className="modal-errors">{errors.password}</p>}
        {submitting && <Loading />}
        <div className="login-form-footer">
          <button
            type="submit"
            className={`btn-submit ${inputInvalid() ? 'disabled' : ''}`}
            disabled={inputInvalid()}
          >
            Log In
          </button>
          <span type="submit" onClick={e => handleSubmit(e, true)}>Login as demo user</span>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
