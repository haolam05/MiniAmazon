export const hideEditBookmarkForm = bookmarkId => {
  const bookmark = document.querySelector(`#bookmark-${bookmarkId}`);
  const textarea = bookmark.querySelector(".bookmark-textarea");
  const note = bookmark.querySelector(".bookmark-note > span");
  if (textarea) textarea.classList.add("hidden");
  if (note) note.classList.remove("hidden");
}

export const showEditBookmarkForm = bookmarkId => {
  const bookmark = document.querySelector(`#bookmark-${bookmarkId}`);
  const textarea = bookmark.querySelector(".bookmark-textarea");
  const note = bookmark.querySelector(".bookmark-note > span");
  if (textarea) textarea.classList.remove("hidden");
  if (note) note.classList.add("hidden");
}
