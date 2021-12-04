import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../components/Input';
import {forgetPassword} from '../../httpServices/user';
import {UserActions} from '../../store/User';
import {Styles} from '../style';
const ForgetPassword = props => {
  const dispatch = useDispatch();
  const {email, error} = useSelector(state => state.User.forgetPassword);
  const onHandleChange = (text, name) => {
    dispatch(
      UserActions.onResetPassword([
        {element: name, value: text},
        {element: 'error', value: ''},
      ]),
    );
  };
  const onSubmit = async () => {
    const result = await forgetPassword(email);
    if (result.data) {
      props.navigation.navigate('ResetCode');
    } else if (result.error) {
      dispatch(
        UserActions.onChangeResetPassword([
          {element: 'error', value: result.error},
        ]),
      );
    }
  };
  return (
    <View style={Styles.defaultStyles.container}>
      <View style={Styles.AuthStyles.forgetPassword}>
        <Input
          title="Email Address"
          onHandleChange={onHandleChange}
          value={email}
          name="email"
          placeholder="youremail@email.com"
        />
        <Text style={Styles.AuthStyles.errorStyle}>{error}</Text>
        <TouchableOpacity
          style={Styles.AuthStyles.authButton}
          onPress={() => onSubmit()}>
          <Text style={Styles.AuthStyles.authText}>
            Send Confirmation Email
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgetPassword;
