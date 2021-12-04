import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import Header from "../Header";
import { Styles as styles } from "../../style";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Switch } from "react-native-elements";
import { normalize } from "react-native-elements";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { getUserData } from "../../../httpServices/user";
import { UiActions } from "../../../store/Ui";
import ProfileLabel from "../../../components/ProfileLabel";
import AuthRequiredModal from "../../../components/AuthRequiredModal";

const UserProfile = (props) => {
  const dispatch = useDispatch();
  const { logged, user } = useSelector((state) => state.UI);
  const [Switcher, setSwitcher] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const result = await getUserData();
      if (!result.error) {
        dispatch(UiActions.onhandleChangeUser({ user: result.data }));
        dispatch(UiActions.onHandleEditProfile({ data: result.data }));
      }
    };
    if (logged) fetch();
  }, []);
  const onHandleLogin = (register) => {
    dispatch(
      UiActions.onHandleUiChange([
        { element: "skip", value: false },
        { element: "logged", value: false },
        { element: "register", value: register },
      ])
    );
  };
  const onSetVisible = (val) => {
    dispatch(
      UiActions.onHandleUiChange([{ element: "authModal", value: val }])
    );
  };
  const onHandleNavigate = (to) => {
    if (logged) {
      props.navigation.navigate(to);
    } else {
      onSetVisible(true);
    }
  };
  return (
    <View>
      <Header {...props} title="My Profile" />
      <View style={styles.profile.ProfileContainer}>
        <View style={styles.profile.profileImage}>
          <Icon
            name="user-o"
            style={{ color: "#0D0D0D", fontSize: 25, fontWeight: "bold" }}
          />
        </View>
        <View style={styles.profile.signInSection}>
          {logged && user ? (
            <React.Fragment>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {user.first_name + " " + user.last_name}
                  </Text>
                  <Text style={{ color: "white", fontSize: 12 }}>
                    @{user.first_name + user.last_name}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FF671D",
                    paddingVertical: 6,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                  }}
                  onPress={() => props.navigation.navigate("EditProfile")}
                >
                  <Text style={{ color: "white" }}>Edit</Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <TouchableOpacity
                style={styles.profile.signButton}
                onPress={() => onHandleLogin(false)}
              >
                <Text style={{ color: "white" }}>Sign In</Text>
              </TouchableOpacity>
              <View style={{ paddingVertical: normalize(10) }}>
                <View style={styles.defaultStyles.flexContainer}>
                  <Text style={{ color: "white" }}>Don't have an accout?</Text>
                  <TouchableOpacity
                    onPress={() => {
                      onHandleLogin(true);
                    }}
                  >
                    <Text
                      style={{
                        color: "#FF671D",
                        textDecorationLine: "underline",
                        marginHorizontal: 20,
                      }}
                    >
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </React.Fragment>
          )}
        </View>
      </View>
      <View style={styles.profile.leftSwitch}>
        <Text style={{ color: "white", fontSize: 16 }}>Kids Account</Text>
        <Switch
          value={Switcher}
          onChange={() => setSwitcher(!Switcher)}
          trackColor={{ false: "#6C757D", true: "#FF671D" }}
          thumbColor="white"
        />
      </View>
      <TouchableOpacity onPress={() => onHandleNavigate("Favorites")}>
        <ProfileLabel
          label="My Favorites"
          icon="arrow-forward-ios"
          icon2="heart-o"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onHandleNavigate("Chat")}>
        <ProfileLabel
          label="Chat With Manager"
          icon="arrow-forward-ios"
          icon2="comments-o"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onHandleNavigate("MyBookings")}>
        <ProfileLabel
          label="My Bookings"
          icon="arrow-forward-ios"
          icon2="calendar"
        />
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;
