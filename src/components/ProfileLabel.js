import React from "react";
import { Styles as styles } from "../screens/style";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileLabel = ({ label, icon, icon2 }) => {
  return (
    <View style={styles.profile.ProfileContainer}>
      <Icon
        name={icon2}
        color="#000000"
        size={24}
        style={styles.profile.profileLabel}
      />
      <View style={styles.profile.ProfileItems}>
        <Text
          style={{
            color: "#C8C9CF",
            paddingHorizontal: 16,
            fontWeight: "500",
          }}
        >
          {label}
        </Text>
        <MaterialIcon name={icon} color="white" size={20} />
      </View>
    </View>
  );
};

export default ProfileLabel;
