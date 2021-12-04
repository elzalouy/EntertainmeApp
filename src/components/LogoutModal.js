import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../httpServices/user";
import { Styles } from "../screens/style";
import { EventsActions } from "../store/Events";
import { UiActions } from "../store/Ui";

const LogoutModal = () => {
  const dispatch = useDispatch();
  const { logoutModal } = useSelector((state) => state.UI);

  const onHandleLogout = async () => {
    const result = await logout();
    if (result) {
      setVisible(false);
      dispatch(EventsActions.onChangeAllState());
      dispatch(UiActions.onChangeAllState());
      dispatch(
        UiActions.onHandleUiChange([
          { element: "skip", value: false },
          { element: "logged", value: false },
        ])
      );
    }
  };
  const setVisible = (val) => {
    dispatch(
      UiActions.onHandleUiChange([{ element: "logoutModal", value: val }])
    );
  };
  return (
    <Modal visible={logoutModal} animationType="slide" transparent={true}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={Styles.settings.modal}>
          <Text style={Styles.settings.modalText}>
            Are you sure you want to Logout?
          </Text>
          <TouchableOpacity
            style={Styles.settings.modlaBtnLogut}
            onPress={() => onHandleLogout()}
          >
            <Text style={{ color: "white" }}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.settings.modalBtnCancel}
            onPress={() => setVisible(false)}
          >
            <Text style={{ color: "white" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
