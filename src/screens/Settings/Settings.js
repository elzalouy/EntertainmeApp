import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import ProfileLabel from "../../components/ProfileLabel";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Styles } from "../style";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../../store/Ui";
const Settings = (props) => {
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.UI);
  const setVisible = () => {
    dispatch(
      UiActions.onHandleUiChange([{ element: "logoutModal", value: true }])
    );
  };
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.navigate("AboutUs")}>
        <ProfileLabel label="About Us" icon="arrow-forward-ios" icon2="users" />
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={Styles.profile.ProfileContainer}>
          <AntIcon
            name="earth"
            color="#000000"
            size={24}
            style={Styles.profile.profileLabel}
          />
          <View style={Styles.profile.ProfileItems}>
            <Text style={Styles.settings.settingLabelText}> Country</Text>
            <Text style={Styles.settings.settingLabelGrayText}> Egypt</Text>
            <MaterialIcon name="arrow-forward-ios" color="#C8C9CF" size={20} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={Styles.profile.ProfileContainer}>
          <MaterialIcon
            name="privacy-tip"
            color="#000000"
            size={24}
            style={Styles.profile.profileLabel}
          />
          <View style={Styles.profile.ProfileItems}>
            <Text style={Styles.settings.settingLabelText}>
              {" "}
              Privacy Policy
            </Text>
            <MaterialIcon name="arrow-forward-ios" color="#C8C9CF" size={20} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <ProfileLabel
          label="Terms and Conditions"
          icon="arrow-forward-ios"
          icon2="file-text-o"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("ContactUs")}>
        <ProfileLabel
          label="Contact Us"
          icon="arrow-forward-ios"
          icon2="phone"
        />
      </TouchableOpacity>
      {logged && (
        <>
          <View style={Styles.settings.SettingsContainer} />
          <TouchableOpacity onPress={() => setVisible(true)}>
            <View style={Styles.profile.ProfileContainer}>
              <MaterialIcon
                name="logout"
                color="#000000"
                size={24}
                style={Styles.settings.settingsLogout}
              />
              <View style={Styles.profile.ProfileItems}>
                <Text style={Styles.settings.settingLabelText}> Log Out</Text>
                <MaterialIcon
                  name="arrow-forward-ios"
                  color="#C8C9CF"
                  size={20}
                />
              </View>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Settings;
