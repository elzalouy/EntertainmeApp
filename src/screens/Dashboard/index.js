import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Discover from "./Discover";
import Profile from "./Profile";
import Updates from "./Updates";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { Default as styles } from "../style";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import Booking from "./Booking";
import AddToBooking from "../../components/addToBooking";
import SearchModal from "../../components/SearchModal";
const BottomTab = createBottomTabNavigator();

const TabIcon = ({ focused, icon, title }) => {
  return (
    <View
      style={
        focused
          ? [styles.defaultStyles.tabActiveItem, { borderRadius: 10 }]
          : styles.defaultStyles.tabItem
      }
    >
      <Icon name={icon} style={styles.defaultStyles.tabIcon} />
      <Text style={styles.defaultStyles.tabTitle}>{title}</Text>
    </View>
  );
};

const DashboardStack = (props) => {
  const { logged, addToBookingModal, searchModal } = useSelector(
    (state) => state.UI
  );
  return (
    <>
      {logged && addToBookingModal && <AddToBooking {...props} />}
      {searchModal && <SearchModal {...props} />}
      <BottomTab.Navigator
        initialRouteName="Discover"
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.defaultStyles.tab,
        }}
      >
        <BottomTab.Screen
          options={{
            unmountOnBlur: true,
            tabBarLabel: "",
            tabBarIcon: ({ focused }) =>
              TabIcon({ focused: focused, title: "Discover", icon: "search1" }),
          }}
          name="Discover"
          component={Discover}
        />
        <BottomTab.Screen
          options={{
            unmountOnBlur: true,
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <View
                style={
                  focused
                    ? [styles.defaultStyles.tabActiveItem, { borderRadius: 10 }]
                    : styles.defaultStyles.tabItem
                }
              >
                <IonIcon
                  name="ios-newspaper"
                  style={styles.defaultStyles.tabIcon}
                />
                <Text style={styles.defaultStyles.tabTitle}>Updates</Text>
              </View>
            ),
          }}
          name="Updates"
          component={Updates}
        />
        <BottomTab.Screen
          options={{
            unmountOnBlur: true,
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <View
                style={
                  focused
                    ? [styles.defaultStyles.tabActiveItem, { borderRadius: 10 }]
                    : styles.defaultStyles.tabItem
                }
              >
                <MatIcon name="event" style={styles.defaultStyles.tabIcon} />
                <Text style={styles.defaultStyles.tabTitle}>Booking</Text>
              </View>
            ),
            tabBarIconStyle: styles.defaultStyles.tabIcon,
          }}
          name={logged ? "Cart" : "Booking"}
          component={logged ? Cart : Booking}
        />
        <BottomTab.Screen
          options={{
            unmountOnBlur: true,
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <View
                style={
                  focused
                    ? [styles.defaultStyles.tabActiveItem, { borderRadius: 10 }]
                    : styles.defaultStyles.tabItem
                }
              >
                <Icon name="user" style={styles.defaultStyles.tabIcon} />
                <Text style={styles.defaultStyles.tabTitle}>Profile</Text>
              </View>
            ),
          }}
          name="Profile"
          component={Profile}
        />
      </BottomTab.Navigator>
    </>
  );
};

export default DashboardStack;
