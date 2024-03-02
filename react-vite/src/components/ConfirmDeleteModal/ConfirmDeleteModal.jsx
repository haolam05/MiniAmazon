import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ text, deleteCb, cancelDeleteCb, title = "Delete" }) {
  function Question() {
    return <p>{text}</p>;
  }

  return (
    <div id="confirm-delete-modal">
      <h2 className="subheading">Confirm {title}</h2>
      <Question />
      <div id="delete-btns">
        <button
          className="btn"
          onClick={deleteCb}
        >
          <span>Yes</span>
        </button>
        <button
          className="btn"
          onClick={cancelDeleteCb}
        >
          <span>No</span>
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
