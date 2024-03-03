import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleNoteOnChange } from "../../utils/form";
import { useModal } from "../../context/Modal";
import { disabledSubmitButton, enabledSubmitButton } from "../../utils/dom";
import NotificationModal from "../NotificationModal";
import * as bookmarkActions from "../../redux/bookmark";
import "./BookmarkForm.css";

function BookmarkForm({ productId }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    disabledSubmitButton();
    setSubmitting(true);

    const data = await dispatch(bookmarkActions.createBookmarkThunk(productId, note));

    if (data?.errors) {
      setSubmitting(false);
      enabledSubmitButton();
      return setErrors(data.errors);
    }

    setSubmitting(false);
    enabledSubmitButton();
    setModalContent(
      <NotificationModal
        message="Successfully created bookmark"
        status="alert-success"
      />
    );
  }

  return (
    <>
      <h2 className="subheading">Create Bookmark</h2>
      <form id="bookmark-form" onSubmit={handleSubmit}>
        <textarea
          spellCheck={false}
          placeholder="Add a note to your bookmark"
          value={note}
          onChange={e => handleNoteOnChange(e, "note", setNote, setErrors)}
        />
        {errors.note && <p className="modal-errors">{errors.note}</p>}
        {submitting && <div className="loader"></div>}
        <button
          type="submit"
          className={note.length ? "" : "disabled"}
          disabled={!note.length}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default BookmarkForm;
