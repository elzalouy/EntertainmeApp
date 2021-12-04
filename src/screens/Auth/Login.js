import React, {useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../httpServices/user';
import {UserActions} from '../../store/User';
import {Auth as styles} from '../style';
import Input from '../../components/Input';
import {UiActions} from '../../store/Ui';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {email, password, error, remember, secure} = useSelector(
    state => state.User.login,
  );
  const onHandleChange = (value, name) => {
    dispatch(UserActions.onChangeLogin([{element: 'error', value: ''}]));
    dispatch(UserActions.onChangeLogin([{element: name, value: value}]));
  };
  const onSubmit = async () => {
    const httpResult = await login(email, password);
    console.log(httpResult);
    if (httpResult.data) {
      dispatch(UiActions.onHandleUiChange([{element: 'logged', value: true}]));
    } else if (httpResult.error)
      dispatch(
        UserActions.onChangeLogin([
          {element: 'error', value: httpResult.error.message},
        ]),
      );
  };
  const onHandleSkip = () => {
    dispatch(
      UiActions.onHandleUiChange([
        {element: 'skip', value: true},
        {element: 'logged', value: false},
      ]),
    );
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.defaultStyles.defaultTheme}>
      <View style={styles.AuthStyles.AuthContainer}>
        <View style={styles.defaultStyles.flexContainer}>
          <Text style={styles.AuthStyles.AuthTextContainer}>Sign in</Text>
          <TouchableOpacity onPress={() => onHandleSkip()}>
            <Text style={styles.AuthStyles.Authskip}>Skip</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.defaultStyles.grayText}>
          Enter to continue and explore EntertainMe
        </Text>
        <Input
          title="Email"
          name="email"
          onHandleChange={onHandleChange}
          value={email}
          placeholder="example@mail.com"
        />
        <Input
          title="Password"
          name="password"
          onHandleChange={onHandleChange}
          value={password}
          secure={secure}
          placeholder="Password"
        />
        <View style={styles.defaultStyles.flexContainer}>
          <TouchableOpacity
            onPress={() => onHandleChange(!remember, 'remember')}
            style={styles.defaultStyles.flexContainer}>
            {remember ? (
              <Icon
                name="check-square"
                size={16}
                color="#ff671d"
                style={styles.AuthStyles.authCheckBox}
              />
            ) : (
              <Icon
                name="square"
                size={16}
                color="#ff671d"
                style={styles.AuthStyles.authCheckBox}
              />
            )}
            <Text style={styles.AuthStyles.authText}>Remember Me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}
            style={{marginLeft: w * 0.07, marginVertical: h * 0.01}}>
            <Text style={styles.defaultStyles.underLineText}>
              Forget Your Password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.AuthStyles.authButton}
          onPress={onSubmit}>
          <Text style={styles.AuthStyles.authText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpStyle}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.AuthStyles.signUpLink}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.AuthStyles.errorConatainer}>
        <Text style={styles.AuthStyles.errorStyle}>{error}</Text>
      </View>
    </ScrollView>
  );
};

export default Login;
