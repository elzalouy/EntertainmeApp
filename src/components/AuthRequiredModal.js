import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Styles } from "../screens/style";
import { UiActions } from "../store/Ui";

const AuthRequiredModal = () => {
  const { authModal, logged } = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const onHandleGoToLogin = () => {
    setVisible(false);
    dispatch(UiActions.onHandleUiChange([{ element: "skip", value: false }]));
  };
  const setVisible = (val) => {
    if (!logged) {
      dispatch(
        UiActions.onHandleUiChange([{ element: "authModal", value: val }])
      );
    } else {
      dispatch(
        UiActions.onHandleUiChange([
          { element: "addToBookingModal", value: val },
        ])
      );
    }
  };
  return (
    <Modal visible={authModal} animationType="slide" transparent={true}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={Styles.settings.authModal}>
          <Text style={Styles.settings.modalText}>
            Sign in required to do this action
          </Text>
          <Text style={Styles.defaultStyles.grayText}>
            Before we start, remember that you can never cross the ocean until
            you have the courage to lose sight of the shore.
          </Text>
          <TouchableOpacity
            style={Styles.settings.modlaBtnLogut}
            onPress={() => onHandleGoToLogin()}
          >
            <Text style={{ color: "white" }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.settings.modalBtnCancel}
            onPress={() => {
              setVisible(false);
            }}
          >
            <Text style={{ color: "white" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AuthRequiredModal;
