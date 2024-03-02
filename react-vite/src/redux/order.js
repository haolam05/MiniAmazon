import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

// Actions
const LOAD_ORDERS = 'orders//LOAD_ORDERS';
const UPDATE_ORDER_ITEM = 'orders//UPDATE_ORDER_ITEM';
const DELETE_ORDER_ITEM = 'orders//DELETE_ORDER_ITEM';
const RESET = 'orders/RESET';


// POJO action creators
const loadOrders = orders => ({
  type: LOAD_ORDERS,
  orders
});

const updateOrderItem = product => ({
  type: UPDATE_ORDER_ITEM,
  product
});

const deleteOrderItem = (orderId, productId) => ({
  type: DELETE_ORDER_ITEM,
  orderId,
  productId
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

export const updateOrderThunk = (orderId, productId, quantityInput) => async dispatch => {
  const response = await csrfFetch(`/api/orders/${orderId}`, {
    method: 'PUT',
    body: JSON.stringify({
      product_id: productId,
      quantity: quantityInput
    })
  });
  const data = await response.json();

  if (!response.ok) return { errors: data };
  if (data.message) {
    dispatch(deleteOrderItem(orderId, productId));
  } else {
    dispatch(updateOrderItem(data));
  }
  return data;
}


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
    case UPDATE_ORDER_ITEM: {
      const newState = { ...state };
      const items = newState.orders[action.product.order_id].items;
      const item = items.find(item => item.id === action.product.id);
      if (item) {
        item.quantity = action.product.quantity;
      }
      return newState;
    }
    case DELETE_ORDER_ITEM: {
      const newState = { ...state };
      newState.orders[action.orderId].items = newState.orders[action.orderId].items.filter(item => item.product_id !== action.productId);
      if (newState.orders[action.orderId].items.length === 0) {
        delete newState.orders[action.orderId];
      }
      return newState;
    }
    case RESET:
      return {
        ...state, orders: null
      }
    default:
      return state;
  }
}

export default orderReducer;
