import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Register from "./Register";
import { Styles } from "../style";
import IONIcon from "react-native-vector-icons/Ionicons";
import ForgetPassword from "./ForgetPassword";
import ResetCode from "./ResetCode";
import ResetPassword from "./ResetPassword";
import { useSelector } from "react-redux";
const AuthStack = createStackNavigator();

const Auth = ({ navigation }) => {
  const { register } = useSelector((state) => state.UI);
  return (
    <React.Fragment>
      <AuthStack.Navigator
        initialRouteName={register === true ? "Register" : "Login"}
      >
        <AuthStack.Screen
          name="Login"
          gestureEnabled={false}
          component={Login}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Register"
          gestureEnabled={false}
          component={Register}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="ForgetPassword"
          gestureEnabled={false}
          component={ForgetPassword}
          options={{
            headerShadowVisible: false,
            headerShown: true,
            headerStyle: Styles.categories.header,
            headerTitleStyle: Styles.categories.headerTitle,
            headerLeft: (props) => {
              return (
                <TouchableOpacity onPressIn={() => navigation.goBack()}>
                  <IONIcon
                    {...props}
                    name="arrow-back"
                    style={Styles.categories.headerIconLeft}
                  />
                </TouchableOpacity>
              );
            },
            headerTintColor: "white",
            headerLeftContainerStyle: Styles.categories.headerIcon,
          }}
        />
        <AuthStack.Screen
          name="ResetCode"
          gestureEnabled={false}
          component={ResetCode}
          options={{
            title: "Reset Code",
            headerShadowVisible: false,
            headerShown: true,
            headerStyle: Styles.categories.header,
            headerTitleStyle: Styles.categories.headerTitle,
            headerLeft: (props) => {
              return (
                <TouchableOpacity onPressIn={() => navigation.goBack()}>
                  <IONIcon
                    {...props}
                    name="arrow-back"
                    style={Styles.categories.headerIconLeft}
                  />
                </TouchableOpacity>
              );
            },
            headerTintColor: "white",
            headerLeftContainerStyle: Styles.categories.headerIcon,
          }}
        />
        <AuthStack.Screen
          name="ResetPassword"
          gestureEnabled={false}
          component={ResetPassword}
          options={{
            title: "Reset Password",
            headerShadowVisible: false,
            headerShown: true,
            headerStyle: Styles.categories.header,
            headerTitleStyle: Styles.categories.headerTitle,
            headerLeft: (props) => {
              return (
                <TouchableOpacity onPressIn={() => navigation.goBack()}>
                  <IONIcon
                    {...props}
                    name="arrow-back"
                    style={Styles.categories.headerIconLeft}
                  />
                </TouchableOpacity>
              );
            },
            headerTintColor: "white",
            headerLeftContainerStyle: Styles.categories.headerIcon,
          }}
        />
      </AuthStack.Navigator>
    </React.Fragment>
  );
};

export default Auth;
