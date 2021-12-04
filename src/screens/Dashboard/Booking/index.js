import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EntertainForm from "./EntertainForm";
import IONIcon from "react-native-vector-icons/Ionicons";
import { Styles as styles } from "../../style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import EventDetailsForm from "./EventDetailsForm";
import ContactForm from "./ContactForm";
import { UiActions } from "../../../store/Ui";
import SuggestedArtists from "./SuggestedArtists";
const BookingStack = createStackNavigator();
const Booking = ({ navigation }) => {
  const dispatch = useDispatch();
  const GoBack = ({ to, step, ...props }) => {
    if (step && step >= 0)
      dispatch(
        UiActions.onHandleUiChange([{ element: "formIndicator", value: step }])
      );
    return (
      <TouchableOpacity
        {...props}
        onPressIn={() => {
          to ? navigation.navigate(to) : navigation.goBack();
        }}
      >
        <IONIcon name="arrow-back" style={styles.categories.headerIconLeft} />
      </TouchableOpacity>
    );
  };

  return (
    <BookingStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="EntertainForm"
    >
      <BookingStack.Screen
        name="EntertainForm"
        component={EntertainForm}
        options={{
          title: "Let us do the work for you",
          headerShadowVisible: false,
          headerShown: true,
          headerStyle: styles.categories.header,
          headerTitleStyle: styles.profile.headerTitle,
          headerTintColor: "white",
          headerLeftContainerStyle: styles.categories.headerIcon,
          headerLeft: () => <GoBack step={0} />,
        }}
      />
      <BookingStack.Screen
        name="EventDetailsForm"
        component={EventDetailsForm}
        options={{
          title: "Let us do the work for you",
          headerShadowVisible: false,
          headerShown: true,
          headerStyle: styles.categories.header,
          headerTitleStyle: styles.profile.headerTitle,
          headerTintColor: "white",
          headerLeftContainerStyle: styles.categories.headerIcon,
          headerLeft: () => GoBack({ to: "EntertainForm", step: 1 }),
        }}
      />
      <BookingStack.Screen
        name="ContactForm"
        component={ContactForm}
        options={{
          title: "Let us do the work for you",
          headerShadowVisible: false,
          headerShown: true,
          headerStyle: styles.categories.header,
          headerTitleStyle: styles.profile.headerTitle,
          headerTintColor: "white",
          headerLeftContainerStyle: styles.categories.headerIcon,
          headerLeft: () => GoBack({ to: "EventDetailsForm", step: 2 }),
        }}
      />
      <BookingStack.Screen
        name="SuggestedArtists"
        component={SuggestedArtists}
        options={{
          title: "Suggested For you",
          headerShadowVisible: false,
          headerShown: true,
          headerStyle: styles.categories.header,
          headerTitleStyle: styles.profile.headerTitle,
          headerTintColor: "white",
          headerLeftContainerStyle: styles.categories.headerIcon,
          headerLeft: () => GoBack({ to: "Discover" }),
        }}
      />
    </BookingStack.Navigator>
  );
};

export default Booking;
