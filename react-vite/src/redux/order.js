import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";
import * as productActions from "./product";

// Actions
const LOAD_ORDERS = 'orders/LOAD_ORDERS';
const CREATE_ORDER = 'orders/CREATE_ORDER';
const CHECKOUT_ORDER = 'orders/CHECKOUT_ORDER';
const UPDATE_ORDER_ITEM = 'orders/UPDATE_ORDER_ITEM';
const DELETE_ORDER_ITEM = 'orders/DELETE_ORDER_ITEM';
const RESET = 'orders/RESET';


// POJO action creators
const loadOrders = orders => ({
  type: LOAD_ORDERS,
  orders
});

export const createOrder = order => ({
  type: CREATE_ORDER,
  order
});

const checkoutOrder = orderId => ({
  type: CHECKOUT_ORDER,
  orderId
});

export const updateOrderItem = item => ({
  type: UPDATE_ORDER_ITEM,
  item
});

export const deleteOrderItem = (orderId, itemId) => ({
  type: DELETE_ORDER_ITEM,
  orderId,
  itemId
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
  data.forEach(order => order.items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
  dispatch(loadOrders(data));
  return data;
};

export const createOrderThunk = product => async (dispatch, getState) => {
  const orders = Object.values(getState().orders.orders);
  const order = orders.find(order => !order.is_checkout);
  if (!order) {
    const response = await csrfFetch(`/api/orders/`, {
      method: 'POST'
    });
    const order = await response.json();
    if (!response.ok) return { errors: order };
    if (!order.message) {
      dispatch(createOrder(order));
    }
    const data = await dispatch(updateOrderThunk(order.id, product.id, 1));
    return data;
  } else {
    const item = order.items.find(item => item.product_id === product.id);
    if (item) return { "message": "Item is already in cart" };
    const data = await dispatch(updateOrderThunk(order.id, product.id, 1));
    return data;
  }
}

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

export const checkoutOrderThunk = (orderId, items) => async dispatch => {
  const response = await csrfFetch(`/api/orders/${orderId}/checkout`);
  const data = await response.json();
  if (!response.ok) return { errors: data };
  dispatch(checkoutOrder(orderId));
  dispatch(productActions.handleCheckout(items));
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
        ...state,
        orders: {
          ...action.orders.reduce((s, p) => (s[p.id] = p) && s, {})
        }
      };
    case CREATE_ORDER:
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.order.id]: action.order
        }
      }
    case CHECKOUT_ORDER:
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.orderId]: {
            ...state.orders[action.orderId],
            is_checkout: true
          }
        }
      }
    case UPDATE_ORDER_ITEM: {
      const newState = { ...state };
      const items = newState.orders[action.item.order_id].items;
      const item = items.find(item => item.id === action.item.id);
      if (item) {
        item.quantity = action.item.quantity;
      } else {
        items.splice(0, 0, action.item);
      }
      return newState;
    }
    case DELETE_ORDER_ITEM: {
      const newState = { ...state };
      newState.orders[action.orderId].items = newState.orders[action.orderId].items.filter(item => item.product_id !== action.itemId);
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
