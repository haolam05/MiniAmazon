import { useState } from "react";
import { useModal } from "../../context/Modal";
import Product from "../Product/Product";
import ConfirmDeleteFormModal from "../ConfirmDeleteModal";
import "./Bookmark.css";

function Bookmark({ user, bookmark, products, inCartProductIds, bookmarkProductIds }) {
  const { setModalContent, closeModal } = useModal();
  const [bookmarkNote, setBookmarkNote] = useState(bookmark.note);

  const hideEditBookmarkForm = e => {
    const textarea = document.querySelector(".bookmark-textarea");
    const note = document.querySelector(".bookmark-note > span");
    if (textarea) textarea.classList.add("hidden");
    if (note) note.classList.remove("hidden");
  }

  const showEditBookmarkForm = () => {
    const textarea = document.querySelector(".bookmark-textarea");
    const note = document.querySelector(".bookmark-note > span");
    if (textarea) textarea.classList.remove("hidden");
    if (note) note.classList.add("hidden");
  }

  const deleteBookmark = async () => {

  }

  const showConfirmDeleteBookmarkForm = () => {
    setModalContent(
      <ConfirmDeleteFormModal
        text="Are you sure you want to delete this bookmark?"
        deleteCb={deleteBookmark}
        cancelDeleteCb={closeModal}
      />
    )
  }

  return (
    <div className="bookmark" id={`bookmark-${bookmark.id}`}>
      <Product
        product={products[bookmark.product_id]}
        user={user}
        inCartProductIds={inCartProductIds}
        bookmarkProductIds={bookmarkProductIds}
      />
      <div className="bookmark-btns">
        <div
          className="edit-bookmark"
          title="Edit bookmark"
          onClick={showEditBookmarkForm}
        >
          <i className="fa-solid fa-gear"></i>
        </div>
        <div
          className="delete-bookmark"
          title="Delete bookmark"
          onClick={showConfirmDeleteBookmarkForm}
        >
          <i className="fa-solid fa-trash"></i>
        </div>
      </div>
      <p className="bookmark-note">
        <span>{bookmark.note}</span>
        <div className="bookmark-textarea hidden">
          <textarea
            type="text"
            spellCheck={false}
            value={bookmarkNote}
            onChange={e => setBookmarkNote(e.target.value)}
          />
          <i className="fa-solid fa-rectangle-xmark" title="Cancel and close" onClick={hideEditBookmarkForm}></i>
          <i className="fa-solid fa-paper-plane" title="Save" onClick={() => { }}></i>
        </div>
      </p>
    </div>
  )
}

export default Bookmark;
