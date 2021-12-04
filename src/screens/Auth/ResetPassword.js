import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../components/Input';
import {resetPassword} from '../../httpServices/user';
import {UserActions} from '../../store/User';
import {Styles} from '../style';
const ResetPassword = props => {
  const dispatch = useDispatch();
  const {password, password_confirmation, code, error, secure} = useSelector(
    state => state.User.forgetPassword,
  );
  const onHandleChange = (text, name) => {
    dispatch(
      UserActions.onResetPassword([
        {element: name, value: text},
        {element: 'error', value: ''},
      ]),
    );
  };
  const onHandleSubmit = async () => {
    const data = {
      code: parseInt(code),
      password: password,
      confirm_password: password_confirmation,
    };
    let result = await resetPassword(data);
    if (result.data) props.navigation.navigate('Login');
    else if (result.error)
      dispatch(
        UserActions.onResetPassword([{element: 'error', value: result.error}]),
      );
  };
  return (
    <View style={Styles.defaultStyles.container}>
      <View style={Styles.AuthStyles.forgetPassword}>
        <Input
          title="New Password"
          onHandleChange={onHandleChange}
          value={password}
          name="password"
          secure={secure}
          placeholder="New Password"
        />
        <Input
          title="Confirm Password"
          onHandleChange={onHandleChange}
          value={password_confirmation}
          name="password_confirmation"
          placeholder="Confirm Password"
          secure={secure}
        />
        <Text style={Styles.AuthStyles.errorStyle}>{error}</Text>
        <TouchableOpacity
          style={Styles.AuthStyles.authButton}
          onPress={() => onHandleSubmit()}>
          <Text style={Styles.AuthStyles.authText}>Save Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPassword;
