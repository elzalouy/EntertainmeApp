import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Styles } from "../screens/style";
import { EventsActions } from "../store/Events";
import _ from "lodash";
const w = Dimensions.get("screen").width;
import { getArtists } from "../httpServices/artists";
const CartArtistsNames = ({ navigation }) => {
  const dispatch = useDispatch();
  const { cart, cartArtists, selectedArtist } = useSelector(
    (state) => state.Events
  );
  const onSelectBooking = (item) => {
    dispatch(
      EventsActions.onChangeUserItem({ element: "selectedArtist", data: item })
    );
  };
  return (
    <>
      <View style={Styles.profile.bookingEventNames}>
        <ScrollView
          style={Styles.profile.recentEventNameList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {cartArtists?.map((item, index) => {
            return (
              <Text
                key={index}
                onPress={() => {
                  onSelectBooking(item);
                }}
                style={[
                  Styles.profile.recentEventName,
                  selectedArtist?.id === item.id &&
                    Styles.profile.selectedRecentEventName,
                  item.name.length < 12 && { width: w * 0.3 },
                ]}
              >
                {item?.name}
              </Text>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default CartArtistsNames;
