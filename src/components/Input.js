import React from "react";
import { View, Text, TextInput } from "react-native";
import Icon1 from "react-native-vector-icons/FontAwesome";
import { Auth as styles } from "../screens/style";

const Input = ({
  title,
  onHandleChange,
  value,
  name,
  placeholder,
  secure,
  multiline,
  numberOfLines,
}) => {
  return (
    <View style={styles.AuthStyles.inputItem}>
      <Text style={styles.AuthStyles.authText}>{title}</Text>
      <View style={styles.defaultStyles.flexContainer}>
        <TextInput
          style={styles.AuthStyles.authInput}
          onChangeText={(text) => onHandleChange(text, name)}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="white"
          secureTextEntry={secure ? secure : false}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        {secure !== undefined ? (
          <Icon1
            style={styles.AuthStyles.authIcon}
            name={secure ? "eye-slash" : "eye"}
            size={20}
            color="gray"
            onPress={() => onHandleChange(!secure, "secure")}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default Input;
