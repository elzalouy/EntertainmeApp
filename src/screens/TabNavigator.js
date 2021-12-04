import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { Default as styles } from "./style";
import Icon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../store/Ui";
import { TouchableOpacity } from "react-native-gesture-handler";

const BottomTab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentTap } = useSelector((state) => state.UI);
  const onHandleChange = (tab, screen) => {
    dispatch(
      UiActions.onHandleUiChange([{ element: "currentTap", value: tab }])
    );
    navigation.navigate(tab, { screen: screen ? screen : "" });
  };
  return (
    <View style={styles.defaultStyles.tab}>
      <TouchableOpacity
        onPress={() => {
          onHandleChange("Discover", "Home");
        }}
      >
        <View
          style={
            currentTap === "Discover"
              ? [styles.defaultStyles.tabActiveItem, { borderRadius: 10 }]
              : styles.defaultStyles.tabItem
          }
        >
          <Icon name="search1" style={styles.defaultStyles.tabIcon} />
          <Text style={styles.defaultStyles.tabTitle}>Discover</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onHandleChange("Updates");
        }}
      >
        <View
          style={
            currentTap === "Updates"
              ? [styles.defaultStyles.tabActiveItem, { borderRadius: 10 }]
              : styles.defaultStyles.tabItem
          }
        >
          <IonIcon name="ios-newspaper" style={styles.defaultStyles.tabIcon} />
          <Text style={styles.defaultStyles.tabTitle}>Updates</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onHandleChange("Bookings");
        }}
      >
        <View
          style={
            currentTap === "Bookings"
              ? [styles.defaultStyles.tabActiveItem, { borderRadius: 10 }]
              : styles.defaultStyles.tabItem
          }
        >
          <MatIcon name="event" style={styles.defaultStyles.tabIcon} />
          <Text style={styles.defaultStyles.tabTitle}>Bookings</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onHandleChange("Profile", "User");
        }}
      >
        <View
          style={
            currentTap === "Profile"
              ? [styles.defaultStyles.tabActiveItem, { borderRadius: 10 }]
              : styles.defaultStyles.tabItem
          }
        >
          <Icon name="user" style={styles.defaultStyles.tabIcon} />
          <Text style={styles.defaultStyles.tabTitle}>Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TabNavigator;
