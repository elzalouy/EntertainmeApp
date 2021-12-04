import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../components/Input';
import {UserActions} from '../../store/User';
import {Styles} from '../style';
const ResetCode = props => {
  const dispatch = useDispatch();
  const {code} = useSelector(state => state.User.forgetPassword);
  const onHandleChange = (text, name) => {
    dispatch(
      UserActions.onResetPassword([
        {element: name, value: text},
        {element: 'error', value: ''},
      ]),
    );
  };
  const onHandleSubmit = () => {
    props.navigation.navigate('ResetPassword');
  };
  return (
    <View style={Styles.defaultStyles.container}>
      <View style={Styles.AuthStyles.forgetPassword}>
        <Input
          title="Enter the code"
          onHandleChange={onHandleChange}
          value={code}
          name="code"
          placeholder="Enter the code we sent to your email"
        />
        <TouchableOpacity
          style={Styles.AuthStyles.authButton}
          onPress={() => onHandleSubmit()}>
          <Text style={Styles.AuthStyles.authText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetCode;
