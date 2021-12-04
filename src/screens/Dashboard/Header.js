import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import { Discover as styles } from "../style";
const Header = ({ title, titleStyle, icon, to, ...props }) => {
  return (
    <View style={styles.discover.header}>
      <Text style={titleStyle ? titleStyle : styles.discover.headerTitle}>
        {title}
      </Text>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("Settings", { screen: "Setting" })
        }
      >
        <Icon
          name={icon ? icon : "setting"}
          style={styles.discover.headerIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
