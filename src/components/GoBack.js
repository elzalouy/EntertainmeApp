import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { UiActions } from "../store/Ui";
import IONIcon from "react-native-vector-icons/Ionicons";
import { Styles } from "../screens/style";

const GoBack = ({ to, step, navigation, ...props }) => {
  if (step && step >= 0)
    useDispatch(
      UiActions.onHandleUiChange([{ element: "formIndicator", value: step }])
    );
  return (
    <TouchableOpacity
      {...props}
      onPressIn={() => {
        to ? navigation.navigate(to) : navigation.goBack();
      }}
    >
      <IONIcon name="arrow-back" style={Styles.categories.headerIconLeft} />
    </TouchableOpacity>
  );
};

export default GoBack;
