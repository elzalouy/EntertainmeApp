import emptyState from "./emptyState";

const onHandleUiChange = (state, action) => {
  action.payload.forEach((item) => {
    state[item.element] = item.value;
  });
};
const onhandleChangeUser = (state, action) => {
  state.user = action.payload.user;
};
export const onHandleEditProfileItem = (state, action) => {
  action.payload.forEach((item) => {
    state.editUser[item.element] = item.value;
  });
};
export const onHandleEditProfile = (state, action) => {
  state.editUser = action.payload.data;
};
export const onChangeAllState = (state, action) => {
  state = emptyState;
};
const exports = {
  onHandleUiChange,
  onhandleChangeUser,
  onHandleEditProfileItem,
  onHandleEditProfile,
  onChangeAllState,
};
export default exports;
