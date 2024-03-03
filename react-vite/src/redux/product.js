import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

// Actions
const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS';
const UPDATE_PRODUCT_REVIEW = 'products/UPDATE_PRODUCT_REVIEW';
const DELETE_PRODUCT_REVIEW = 'products/DELETE_PRODUCT_REVIEW';
const HANDLE_CHECKOUT = 'products/HANDLE_CHECKOUT';


// POJO action creators
const loadProducts = products => ({
  type: LOAD_PRODUCTS,
  products
});

const updateProductReview = (productId, review) => ({
  type: UPDATE_PRODUCT_REVIEW,
  productId,
  review
});

const deleteProductReview = (productId, reviewId) => ({
  type: DELETE_PRODUCT_REVIEW,
  productId,
  reviewId
});

export const handleCheckout = items => ({
  type: HANDLE_CHECKOUT,
  items
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

export const updateProductReviewThunk = (productId, reviewId, review, rating) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    body: JSON.stringify({
      review,
      rating
    })
  });
  const data = await response.json();

  if (!response.ok) return { "errors": data };
  dispatch(updateProductReview(productId, data));
  return data;
}

export const deleteProductReviewThunk = (productId, reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });
  const data = await response.json();

  if (!response.ok) return { errors: data };
  dispatch(deleteProductReview(productId, reviewId));
  return data;
}


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
    case UPDATE_PRODUCT_REVIEW: {
      const newState = { ...state };
      const reviews = newState.products[action.productId].reviews;
      for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i];
        if (review.id === action.review.id) {
          reviews.splice(i, 1);
        }
      }
      reviews.push(action.review);
      return newState;
    }
    case DELETE_PRODUCT_REVIEW: {
      const newState = { ...state };
      const reviews = newState.products[action.productId].reviews;
      newState.products[action.productId].reviews = reviews.filter(review => review.id !== action.reviewId);
      return newState;
    }
    case HANDLE_CHECKOUT: {
      const newState = { ...state };
      const products = newState.products;
      action.items.forEach(item => {
        products[item.product_id].remaining -= item.quantity;
      });
      return newState;
    }
    default:
      return state;
  }
}

export default productReducer;
