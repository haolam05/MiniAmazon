import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useSecondaryModal } from "../../context/SecondaryModal";
import { useDispatch } from "react-redux";
import { hideEditBookmarkForm, showEditBookmarkForm } from "../../utils/bookmark";
import Product from "../Product/Product";
import NotificationModal from "../NotificationModal";
import ConfirmDeleteFormModal from "../ConfirmDeleteModal";
import * as bookmarkActions from "../../redux/bookmark";
import "./Bookmark.css";
import Bookmarks from "../Bookmarks";

function Bookmark({ user, bookmarks, bookmark, products, inCartProductIds, bookmarkProductIds }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const { setSecondaryModalContent, closeSecondaryModal } = useSecondaryModal();
  const [bookmarkNote, setBookmarkNote] = useState(bookmark.note);
  const [bookmarkNoteInput, setBookmarkNoteInput] = useState(bookmark.note);

  const updateBookmark = async () => {
    await dispatch(bookmarkActions.updateBookmarkThunk(bookmark.id, bookmarkNoteInput));
  }

  const deleteBookmark = async () => {
    await dispatch(bookmarkActions.deleteBookmarkThunk(bookmark.id));
    setSecondaryModalContent(
      <NotificationModal
        message="Successfully deleted bookmark"
        status="alert-success"
        secondaryModal={true}
      />
    );
    setModalContent(
      <Bookmarks
        user={user}
        products={products}
        inCartProductIds={inCartProductIds}
        bookmarks={bookmarks.filter(b => b.id !== bookmark.id)}
        bookmarkProductIds={bookmarkProductIds}
      />
    );
  }

  const showConfirmDeleteBookmarkForm = () => {
    setSecondaryModalContent(
      <ConfirmDeleteFormModal
        text="Are you sure you want to delete this bookmark?"
        deleteCb={deleteBookmark}
        cancelDeleteCb={closeSecondaryModal}
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
          onClick={() => showEditBookmarkForm(bookmark.id)}
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
      <div className="bookmark-note">
        <span>{bookmarkNote}</span>
        <div className="bookmark-textarea hidden">
          <textarea
            type="text"
            spellCheck={false}
            placeholder="Note can not be empty :)"
            value={bookmarkNoteInput}
            onChange={e => setBookmarkNoteInput(e.target.value)}
          />
          <i className="fa-solid fa-rectangle-xmark" title="Cancel and close" onClick={() => {
            hideEditBookmarkForm(bookmark.id);
            setBookmarkNoteInput(bookmark.note);
          }}></i>
          <i className={`fa-solid fa-paper-plane${bookmarkNoteInput.length ? "" : " disabled"}`} title="Save" onClick={() => {
            if (bookmarkNoteInput.length) {
              hideEditBookmarkForm(bookmark.id);
              setBookmarkNote(bookmarkNoteInput);
              updateBookmark();
            }
          }}></i>
        </div>
      </div>
    </div>
  )
}

export default Bookmark;
