import {remove} from 'lodash';
import emptyState from './emptyState';
export const onHandleBookEvent = (state, action) => {
  action.payload.forEach(item => {
    state.bookEvent[item.element] = item.value;
  });
};
export const onHandleBookEventArray = (state, action) => {
  const index =
    state.bookEvent[action.payload.element] &&
    state.bookEvent[action.payload.element].indexOf(action.payload.value);
  index >= 0
    ? remove(
        state.bookEvent[action.payload.element],
        item => item === state.bookEvent[action.payload.element][index],
      )
    : state.bookEvent[action.payload.element].push(action.payload.value);
};
export const onHandleError = (state, action) => {
  state.error = action.payload;
};
export const onHandleBookEventPut = (state, action) => {
  state.bookEvent = action.payload;
};
export const onHandleInitialize = (state, action) => {
  state.bookEvent = {
    name: '',
    description: '',
    budget: '',
    duration: '',
    budget_tbd: false,
    duration_tbd: false,
    placement: '',
    guests: '',
    date: '',
    address: '',
    additional_info: '',
    artist_id: [],
    additional_equipment: [],
    items_of_production: [],
    type: '',
  };
};
export const onAddToBooking = (state, action) => {
  let carts = [...state.addToBookingList];
  let existed = carts.findIndex(
    item => item.artist_id === action.payload.artist_id,
  );
  if (existed < 0) {
    carts = [...carts, action.payload];
    state.addToBookingList = carts;
  }
};
export const onRemoveFromBooking = (state, action) => {
  let carts = [...state.addToBookingList];
  carts = carts.filter(item => item.artist_id !== action.payload);
  state.addToBookingList = carts;
};
export const onChangeUserItem = (state, action) => {
  state[action.payload.element] = action.payload.data;
};
export const onChangeUserItems = (state, action) => {
  action.payload.forEach(item => {
    state[item.element] = item.data;
  });
};
export const onChangeCart = (state, action) => {
  let cart = {...state.cart};
  let carts = [...state.carts];
  carts = carts.filter(item => item.id !== cart.id);
  let artists = cart.artists;
  cart = action.payload;
  cart.artists = artists;
  state.cart = cart;
  state.carts = carts;
};
export const onChangeAllState = (state, action) => {
  state = emptyState;
};
const exports = {
  onHandleBookEvent,
  onHandleBookEventArray,
  onHandleError,
  onHandleBookEventPut,
  onHandleInitialize,
  onAddToBooking,
  onRemoveFromBooking,
  onChangeUserItem,
  onChangeUserItems,
  onChangeAllState,
  onChangeCart,
};
export default exports;
