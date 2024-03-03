import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

// Actions
const LOAD_BOOKMARKS = 'bookmarks/LOAD_BOOKMARKS';


// POJO action creators
const loadBookmarks = bookmarks => ({
  type: LOAD_BOOKMARKS,
  bookmarks
});


// Thunk action creators
export const loadBookmarksThunk = userId => async (dispatch, getState) => {
  if (getState().bookmarks.bookmarks !== null) return;
  const response = await csrfFetch(`/api/users/${userId}/bookmarks`);
  const data = await response.json();

  if (!response.ok) return { errors: data };
  dispatch(loadBookmarks(data));
  return data;
};


// Custom selectors
export const getBookmarks = createSelector(
  state => state.bookmarks,
  bookmarks => bookmarks.bookmarks ? Object.values(bookmarks.bookmarks) : []
);


// Reducer
const initialState = { bookmarks: null };

function bookmarkReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BOOKMARKS:
      return {
        ...state, bookmarks: {
          ...action.bookmarks.reduce((s, p) => (s[p.id] = p) && s, {})
        }
      };
    default:
      return state;
  }
}

export default bookmarkReducer;
