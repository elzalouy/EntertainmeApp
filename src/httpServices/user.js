import http from './httpHandler';
import _try from '../utils/try';
import handleServerError from './handleServerError';
import {APIUrl} from './http.json';
import {setItems, setItem, getItem, removeItem} from '../utils/StorageHandler';
const api = APIUrl + '/api/';

/**
 * Login
 *
 * Login Function is reponsible for giving users a lisence to access their accounts and features that need a permission.
 * @param {email} email The user's email is required
 * @param {pasword} password The password is required
 * @returns response data and error
 */
export const login = _try(async (email, password) => {
  const response = await http.post(api + 'login', {
    email: email,
    password: password,
  });
  const result = handleServerError(response);
  if (result) return {data: null, error: result};
  if (response.status === 200) {
    const token = await setItem({
      key: 'x-auth-token',
      value: response.data.data.token,
    });
    return {data: response.data, error: null};
  } else {
    return {
      data: null,
      error: {key: 'invalid', message: response.response.data.message},
    };
  }
});

/**
 * @param {email} email The email of the user that will be used to communicate with (required)
 * @param {name} name The user name is required
 * @param {message} message Message the user need to send the support team for help
 * @returns {data} data  if the Response is ok (status code 200)
 * @returns {error} error if the response is a bad request (status code 400)
 */

export const contactUs = _try(async (email, name, message) => {
  const response = await http.post(api + 'send_brief', {
    email,
    name,
    message,
  });
  const handleError = handleServerError(response);
  if (handleError) return {data: null, error: handleError};
  if (response.status === 200) {
    return {data: response.data, error: null};
  } else {
    return {error: response.response.data.message, data: null};
  }
});

/**
 * Register
 *
 * Call API endpoint named 'register' as an http request to the API server and handle registeration
 * @param {data} data Data reuired to register a new user {email,password,password_confirmation,first_name,last_name}
 */

export const register = _try(async data => {
  const response = await http.post(api + 'register', data);
  const result = handleServerError(response);
  if (result) return {data: null, error: result};
  if (response.status === 200) {
    await setItem({key: 'x-auth-token', value: response.data.data.token});
    return {data: response.data, error: null};
  } else {
    return {
      data: null,
      error: {
        key: 'error',
        message:
          response.response.data.data[
            Object.keys(response.response.data.data)[0]
          ][0],
      },
    };
  }
});

export const getUserData = async () => {
  const token = await getItem('x-auth-token');
  const response = await http.get(api + 'user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = handleServerError(response);
  if (result) return {data: null, error: result};
  else
    return {
      data: response.data,
      error: null,
    };
};
export const authed = _try(async () => {
  let token = await getItem('x-auth-token');
  if (token === null) {
    return false;
  }
  return true;
});

export const logout = _try(async () => {
  await removeItem('x-auth-token');
  return true;
});
export const editUser = _try(async data => {
  console.log(data);
  const token = await getItem('x-auth-token');
  const response = await http.post(
    api + 'profile',
    {
      first_name: data.first_name,
      last_name: data.last_name,
      image: data.image ? data.image : {},
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log(response.response);
});

export const forgetPassword = async email => {
  const response = await http.post(api + 'password/forget', {email: email});
  const result = handleServerError(response);
  if (result) return {data: null, error: result};
  if (response.response)
    return {error: response.response.data.errors.email[0], data: null};
  if (response?.data?.success)
    return {data: response.data.success, error: null};
};
export const resetPassword = async data => {
  if (data.password !== data.confirm_password)
    return {data: null, error: 'Password not matches confirm password'};
  const response = await http.post(api + 'password/reset', data);
  const result = handleServerError(response);
  if (result) return {data: null, error: result};
  if (response.response)
    return {error: response.response.data.error.code[0], data: null};
  if (response?.data?.success)
    return {data: response.data.success, error: null};
};
