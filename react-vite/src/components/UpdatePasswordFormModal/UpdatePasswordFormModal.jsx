import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { disabledSubmitButton, enabledSubmitButton } from "../../utils/dom";
import { handlePasswordOnChange } from "../../utils/form";
import Loading from "../Loading";
import NotificationModal from "../NotificationModal";
import * as sessionActions from "../../redux/session";

function UpdatePasswordFormModal({ user }) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { setModalContent } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    disabledSubmitButton();

    setSubmitting(true);
    const data = await dispatch(
      sessionActions.updateUserPasswordThunk({
        password,
        new_password: newPassword
      })
    );

    if (data?.errors) {
      enabledSubmitButton();
      setSubmitting(false);
      return setErrors(data.errors);
    }

    setModalContent(
      <NotificationModal
        message="Successfully Updated! Please log in again!"
        status="alert-success"
      />
    );
    enabledSubmitButton();
    setSubmitting(false);
  };

  const inputInvalid = () => {
    return (
      password.length < 6 ||
      newPassword.length < 6
    );
  }

  if (!user) return;

  return (
    <>
      <h2 className="subheading">Update Password</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Current Password</label>
        <input
          type="password"
          spellCheck={false}
          value={password}
          onChange={e => handlePasswordOnChange(e, "password", setPassword, setErrors)}
          required
        />
        {errors.password && <p className="modal-errors">{errors.password}</p>}
        <label>New Password</label>
        <input
          type="password"
          spellCheck={false}
          value={newPassword}
          onChange={e => handlePasswordOnChange(e, "newPassword", setNewPassword, setErrors)}
          required
        />
        {errors.newPassword && <p className="modal-errors">{errors.newPassword}</p>}
        {submitting && <Loading />}
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

export default UpdatePasswordFormModal;
