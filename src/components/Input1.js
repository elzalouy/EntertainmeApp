import React from "react";
import { View, Text, TextInput } from "react-native";
import Icon1 from "react-native-vector-icons/FontAwesome";
import { Styles } from "../screens/style";

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
    <View style={Styles.AuthStyles.inputItem}>
      <Text style={Styles.AuthStyles.authText}>{title}</Text>
      <TextInput
        style={Styles.cart.authInput}
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
          style={Styles.AuthStyles.authIcon}
          name={secure ? "eye-slash" : "eye"}
          size={20}
          color="gray"
          onPress={() => onHandleChange(!secure, "secure")}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default Input;
