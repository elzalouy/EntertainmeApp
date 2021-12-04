import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Categories from "./Categories";
import { Categories as styles } from "../../style";
import IONIcon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Artist from "./Artist";
import Booking from "../Booking";
const DiscoverStack = createStackNavigator();

const Discover = ({ navigation }) => {
  return (
    <DiscoverStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <DiscoverStack.Screen name="Home" component={Home} />
      <DiscoverStack.Screen
        name="Categories"
        options={({ route, navigation }) => ({
          title: "Search by Category",
          headerShadowVisible: false,
          headerShown: true,
          headerStyle: styles.categories.header,
          headerTitleStyle: styles.categories.headerTitle,
          headerRight: (props) => {
            return (
              <IONIcon
                {...props}
                name="filter-sharp"
                style={styles.categories.headerIcon}
              />
            );
          },
          headerLeft: (props) => {
            return (
              <TouchableOpacity onPressIn={() => navigation.goBack()}>
                <IONIcon
                  {...props}
                  name="arrow-back"
                  style={styles.categories.headerIconLeft}
                />
              </TouchableOpacity>
            );
          },
          headerTintColor: "white",
          headerLeftContainerStyle: styles.categories.headerIcon,
        })}
        component={Categories}
      />
      <DiscoverStack.Screen
        name="Artist"
        component={Artist}
        options={{ headerShown: false }}
      />
      <DiscoverStack.Screen
        name="Booking"
        component={Booking}
        options={{
          headerLeft: (props) => {
            return (
              <TouchableOpacity onPressIn={() => navigation.goBack()}>
                <IONIcon
                  {...props}
                  name="arrow-back"
                  style={styles.categories.headerIconLeft}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </DiscoverStack.Navigator>
  );
};
export default Discover;
