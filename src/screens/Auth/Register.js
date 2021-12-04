import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Auth as styles} from '../style';
import {useDispatch, useSelector} from 'react-redux';
import {UserActions} from '../../store/User';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import {register} from '../../httpServices/user';
import Input from '../../components/Input';
import {UiActions} from '../../store/Ui';
const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
    error,
    secure,
  } = useSelector(state => state.User.register);
  const onHandleChangeData = (value, name) => {
    dispatch(UserActions.onChangeRegister([{element: name, value: value}]));
  };

  const onSubmit = async () => {
    const httpResult = await register({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      type: 'user',
    });
    if (httpResult.data)
      dispatch(
        UiActions.onHandleUiChange([
          {element: 'logged', value: true},
          {element: 'skip', value: false},
        ]),
      );
    else {
      dispatch(
        UserActions.onChangeRegister([
          {element: 'error', value: httpResult.error.message},
        ]),
      );
    }
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
        <View style={[styles.defaultStyles.flexContainer]}>
          <Text style={styles.AuthStyles.AuthTextContainer}>Register</Text>
          <TouchableOpacity onPress={() => onHandleSkip()}>
            <Text style={styles.AuthStyles.Authskip}>Skip</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.AuthStyles.authText}>
            Already Have an account?
            <Text style={styles.defaultStyles.underLineText}>Sign in</Text>
          </Text>
        </TouchableOpacity>
        <Text style={styles.defaultStyles.grayText}>or continue with</Text>
        <View style={styles.defaultStyles.flexContainer}>
          <Button
            buttonStyle={styles.AuthStyles.googleMediaBtn}
            titleStyle={{color: 'black'}}
            icon={
              <Icon
                name="google"
                color="black"
                size={25}
                style={styles.AuthStyles.mediaIcon}
              />
            }
            title="Sign In"
          />
          <Button
            buttonStyle={styles.AuthStyles.facebookMediaBtn}
            icon={
              <Icon2
                name="sc-facebook"
                color="white"
                size={30}
                style={styles.AuthStyles.mediaIcon}
              />
            }
            title="Sign In"
          />
        </View>
        <Input
          title="First Name"
          name="first_name"
          onHandleChange={onHandleChangeData}
          value={first_name}
          placeholder="First Name"
        />

        <Input
          title="Last Name"
          name="last_name"
          onHandleChange={onHandleChangeData}
          value={last_name}
          placeholder="Last Name"
        />
        <Input
          title="Email"
          name="email"
          onHandleChange={onHandleChangeData}
          value={email}
          placeholder="example@mail.com"
        />
        <Input
          title="Password"
          name="password"
          onHandleChange={onHandleChangeData}
          value={password}
          placeholder="Password"
          secure={secure}
        />
        <Input
          title="Confirm Password"
          name="password_confirmation"
          onHandleChange={onHandleChangeData}
          value={password_confirmation}
          placeholder="confrim password"
          secure={secure}
        />
        <Text style={styles.AuthStyles.errorStyle}>{error}</Text>
        <TouchableOpacity
          style={styles.AuthStyles.authButton}
          onPress={() => onSubmit()}>
          <Text style={styles.AuthStyles.authText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Register;
