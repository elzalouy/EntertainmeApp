import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "./Settings";
import { Styles } from "../style";
import IONIcon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
const SettingStack = createStackNavigator();

const SettingsStack = (props) => {
  return (
    <SettingStack.Navigator
      initialRouteName="Setting"
      screenOptions={{ headerShown: false }}
    >
      <SettingStack.Screen
        name="Setting"
        component={Settings}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerStyle: Styles.categories.header,
          headerTitleStyle: Styles.categories.headerTitle,
          title: "Settings",
          headerLeft: () => {
            return (
              <TouchableOpacity onPressIn={() => props.navigation.goBack()}>
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
      <SettingStack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerStyle: Styles.categories.header,
          headerTitleStyle: Styles.categories.headerTitle,
          title: "About Us",
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPressIn={() => props.navigation.navigate("Setting")}
              >
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
      <SettingStack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerStyle: Styles.categories.header,
          headerTitleStyle: Styles.categories.headerTitle,
          title: "Contact Us",
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPressIn={() => props.navigation.navigate("Setting")}
              >
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
    </SettingStack.Navigator>
  );
};

export default SettingsStack;
