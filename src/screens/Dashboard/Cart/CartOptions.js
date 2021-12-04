import React from "react";
import { Text, View } from "react-native";
import CartArtistsNames from "../../../components/CartArtistsNames";
import CartEventsNames from "../../../components/CartEventsNames";
import { Styles } from "../../style";
const CartOptions = (props) => {
  return (
    <>
      <View style={Styles.defaultStyles.container}>
        <Text style={Styles.artist.artistDescription}>Your Cart</Text>
      </View>
      <CartEventsNames {...props} />
      <View style={Styles.defaultStyles.container}>
        <Text style={Styles.artist.artistDescription}>Choose Artist</Text>
      </View>
      <CartArtistsNames {...props} />
    </>
  );
};

export default CartOptions;
