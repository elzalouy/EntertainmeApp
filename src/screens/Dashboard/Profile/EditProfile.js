import React, { useEffect } from "react";
import {
  Text,
  TouchableOpacityComponent,
  View,
  ScrollView,
} from "react-native";
import Header from "../Header";
import { Styles as styles } from "../../style";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import Input from "../../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../../../store/Ui";
import { editUser as httpEditUser } from "../../../httpServices/user";
const EditProfile = (props) => {
  const dispatch = useDispatch();
  const { editUser } = useSelector((state) => state.UI);
  const onHandleChange = (text, name) => {
    dispatch(
      UiActions.onHandleEditProfileItem([{ element: name, value: text }])
    );
  };
  const onHandlePress = async () => {
    const result = await httpEditUser({
      first_name: editUser.first_name,
      last_name: editUser.last_name,
      email: editUser.email,
      password: editUser.password,
      image: editUser.image,
    });
  };
  return (
    <ScrollView>
      <Header {...props} title="Edit Profile" />
      <View style={styles.profile.ProfileContainer}>
        <View style={styles.profile.profileImage}>
          <Icon
            name="user-o"
            style={{ color: "#0D0D0D", fontSize: 25, fontWeight: "bold" }}
          />
        </View>
        <View style={styles.profile.signInSection}>
          <TouchableOpacity>
            <Text style={styles.profile.uploadPhoto}>Upload Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.defaultStyles.container}>
        <Input
          title="Firts Name"
          onHandleChange={onHandleChange}
          name="first_name"
          value={editUser.first_name}
          placeholder="First Name"
        />
        <Input
          title="Last Name"
          onHandleChange={onHandleChange}
          name="last_name"
          value={editUser.last_name}
          placeholder="Last Name"
        />
        <Input
          title="Email"
          onHandleChange={onHandleChange}
          name="email"
          value={editUser.email}
          placeholder="email"
        />
        <Input
          title="Password"
          onHandleChange={onHandleChange}
          name="password"
          value={editUser.password}
          placeholder="Password"
          secure={editUser.secure}
        />
      </View>
      <TouchableOpacity
        style={styles.AuthStyles.authButton}
        onPress={() => onHandlePress()}
      >
        <Text style={{ color: "white" }}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;
