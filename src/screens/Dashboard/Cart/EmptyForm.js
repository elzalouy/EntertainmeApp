import React from "react";
import { Text, View } from "react-native";
import { Styles } from "../../style";
import AntIcon from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
const EmptyCart = () => {
  const { cartLoading } = useSelector((state) => state.UI);
  return (
    <View style={Styles.defaultStyles.centered}>
      <AntIcon name="shoppingcart" color="#6C757D" size={70} />
      <Text style={{ color: "#6C757D", fontWeight: "bold", fontSize: 12 }}>
        Cart is {cartLoading === true ? "Loading" : "Empty"}
      </Text>
    </View>
  );
};

export default EmptyCart;
