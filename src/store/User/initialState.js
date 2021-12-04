const initialState = {
  login: {
    email: '',
    password: '',
    error: '',
    remember: false,
    secure: true,
  },
  contactUs: {
    email: '',
    name: '',
    message: '',
    error: '',
  },
  register: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    type: 'user',
    error: '',
    secure: true,
  },
  forgetPassword: {
    email: '',
    code: '',
    password: '',
    password_confirmation: '',
    error: '',
    secure: false,
  },
};
export default initialState;
