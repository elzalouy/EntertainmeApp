import _ from 'lodash';
/**
 * onChangeLogin
 *
 * On handle changing input values on the store
 *
 * @param {state} state Current state
 * @param {action} action Action that you need to do
 */

export const onChangeLogin = (state, action) => {
  action.payload.forEach(item => {
    state.login[item.element] = item.value;
  });
};

/**
 * onChangeContactUs
 *
 * send a message to the support team
 * @param {sate} state State to be changed
 * @param {action} action Action to be executed on the state
 */
export const onChangeContactUs = (state, action) => {
  action.payload.forEach(item => {
    state.contactUs[item.element] = item.value;
  });
};

/**
 * onChangeRegister
 *
 * handle changing state of the registeration page
 *
 * @param {sate} state State to be changed
 * @param {action} action Action to be executed on the state
 */
export const onChangeRegister = (state, action) => {
  action.payload.forEach(item => {
    state.register[item.element] = item.value;
  });
};
export const onResetPassword = (state, action) => {
  action.payload.forEach(item => {
    state.forgetPassword[item.element] = item.value;
  });
};
const exports = {
  onChangeLogin,
  onChangeContactUs,
  onChangeRegister,
  onResetPassword,
};

export default exports;
