import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

// Actions
const LOAD_PRODUCTS = 'products//LOAD_PRODUCTS';


// POJO action creators
const loadProducts = products => ({
  type: LOAD_PRODUCTS,
  products
});


// Thunk action creators
export const loadProductsThunk = () => async (dispatch, getState) => {
  if (getState().products.products !== null) return;
  const response = await csrfFetch(`/api/products`);
  const data = await response.json();

  if (!response.ok) return { errors: data };
  dispatch(loadProducts(data.products));
  return data;
};


// Custom selectors
export const getProducts = createSelector(
  state => state.products,
  products => products.products ? Object.values(products.products) : []
);

export const getProductsObject = state => state.products.products;


// Reducer
const initialState = { products: null };

function productReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state, products: {
          ...action.products.reduce((s, p) => (s[p.id] = p) && s, {})
        }
      };
    default:
      return state;
  }
}

export default productReducer;
