import { csrfFetch } from "./csrf";

// Actions
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';


// POJO action creators
const setUser = user => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});


// Thunk action creators
export const restoreSession = () => async (dispatch, getState) => {
  console.log(getState().session.user, getState().session.user?.user);
  if (getState().session.user !== null) return;
  const response = await csrfFetch("/api/auth/");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) return;
    dispatch(setUser(data));
    return data;
  }
};

export const thunkLogin = user => async dispatch => {
  const { first_name, last_name, profile_image_url, email, username, password } = user;
  const formData = new FormData();
  formData.append("first_name", first_name)
  formData.append("last_name", last_name)
  formData.append("email", email)
  formData.append("username", username)
  formData.append("password", password)

  if (profile_image_url) formData.append("profile_image_url", profile_image_url);

  const response = await csrfFetch("/api/auth/signup", {
    method: "POST",
    body: formData
  });

  const data = await response.json();
  if (!response.ok) return { errors: data };
  dispatch(setUser(data));
};

export const thunkSignup = user => async dispatch => {
  const response = await csrfFetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async dispatch => {
  await csrfFetch("/api/auth/logout");
  dispatch(removeUser());
};


// Custom selectors
export const sessionUser = state => state.session.user;


// Reducer
const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
