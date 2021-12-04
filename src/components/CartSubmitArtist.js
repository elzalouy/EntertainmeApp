import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Styles } from "../screens/style";

const CartSubmitArtist = ({ item, navigation }) => {
  return (
    <View key={item.id} style={Styles.profile.submitArtistCard}>
      <Image style={Styles.profile.bookingForItemImage} source={item.image} />
      <Text style={Styles.profile.bookingForItemCategory}>Category</Text>
      <View style={Styles.profile.bookingForItemContent}>
        <Text style={Styles.profile.bookingForItemTitle}>{item.name}</Text>
        <Text style={Styles.profile.bookingForItemDesc} numberOfLines={2}>
          {item.description}
        </Text>
        <TouchableOpacity
          style={Styles.profile.ArtistViewDetailsBtn}
          onPress={() => navigation.navigate("FinalCart", { artist: item })}
        >
          <Text style={{ color: "#FF671D", fontSize: 12 }}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartSubmitArtist;
