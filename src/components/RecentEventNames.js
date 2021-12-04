import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Styles } from "../screens/style";
import { EventsActions } from "../store/Events";
import _ from "lodash";
const w = Dimensions.get("screen").width;

const CartEventsNames = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userBookings, selectedBooking } = useSelector(
    (state) => state.Events
  );
  const onSelectBooking = (item) => {
    dispatch(
      EventsActions.onChangeUserItem({ element: "selectedBooking", data: item })
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
          {userBookings?.map((item) => {
            return (
              <Text
                onPress={() => {
                  onSelectBooking(item);
                }}
                key={item.id}
                style={[
                  Styles.profile.recentEventName,
                  selectedBooking?.id === item.id &&
                    Styles.profile.selectedRecentEventName,
                  item.name.length < 12 && { width: w * 0.3 },
                ]}
              >
                {item.name}
              </Text>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default CartEventsNames;
