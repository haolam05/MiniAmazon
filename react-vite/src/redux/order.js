import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

// Actions
const LOAD_ORDERS = 'orders//LOAD_ORDERS';
const RESET = 'orders/RESET';


// POJO action creators
const loadOrders = orders => ({
  type: LOAD_ORDERS,
  orders
});

export const reset = () => ({
  type: RESET
});


// Thunk action creators
export const loadOrdersThunk = () => async (dispatch, getState) => {
  if (getState().orders.orders !== null) return;
  const response = await csrfFetch(`/api/orders/`);
  const data = await response.json();

  if (!response.ok) return { errors: data };
  dispatch(loadOrders(data));
  return data;
};


// Custom selectors
export const getOrders = createSelector(
  state => state.orders,
  orders => orders.orders ? Object.values(orders.orders) : []
);


// Reducer
const initialState = { orders: null };

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ORDERS:
      return {
        ...state, orders: {
          ...action.orders.reduce((s, p) => (s[p.id] = p) && s, {})
        }
      };
    case RESET:
      return {
        ...state, orders: null
      }
    default:
      return state;
  }
}

export default orderReducer;
