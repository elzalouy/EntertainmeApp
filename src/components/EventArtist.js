import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getArtist } from "../httpServices/artists";
import { Styles } from "../screens/style";
import IonIcon from "react-native-vector-icons/Ionicons";
import { APIUrl } from "../httpServices/http.json";
import { useSelector } from "react-redux";
const EventArtist = ({ artist, onHandleAddToBooking, ...props }) => {
  const { addToBookingList, selectedBooking } = useSelector(
    (state) => state.Events
  );

  return (
    <View key={artist.id} style={Styles.profile.bookingForItem}>
      <Image
        style={Styles.profile.bookingForItemImage}
        source={APIUrl + artist.image}
      />
      <Text style={Styles.profile.bookingForItemCategory}>Category</Text>
      <View style={Styles.profile.bookingForItemContent}>
        <Text style={Styles.profile.bookingForItemTitle}>{artist.name}</Text>
        <Text style={Styles.profile.bookingForItemDesc} numberOfLines={2}>
          {artist.description}
        </Text>
        {addToBookingList?.find(
          (i) =>
            i.artist_id === artist.id &&
            i.event_ids.findIndex((n) => n === selectedBooking.id) >= 0
        ) ? (
          <TouchableOpacity style={Styles.profile.bookingForItemButtonAdded}>
            <Text style={{ color: "white", fontSize: 12 }}>
              <IonIcon name="cart-outline" style={{ fontSize: 16 }} /> Added to
              Cart
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={Styles.profile.bookingForItemButton}
            onPress={() => onHandleAddToBooking(artist)}
          >
            <Text style={{ color: "#FF671D", fontSize: 12 }}>
              <IonIcon name="cart-outline" style={{ fontSize: 16 }} /> Add To
              Booking
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default EventArtist;
