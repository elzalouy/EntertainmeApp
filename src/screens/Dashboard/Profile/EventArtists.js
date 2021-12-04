import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Styles } from "../../style";
import EventArtist from "../../../components/EventArtist";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { updateOrder } from "../../../httpServices/event";
import _ from "lodash";
import { EventsActions } from "../../../store/Events";
import { getArtists } from "../../../httpServices/artists";
const EventArtists = (props) => {
  const dispatch = useDispatch();
  const { selectedBooking, addToBookingList } = useSelector(
    (state) => state.Events
  );
  const [Artists, setArtists] = useState([]);
  useEffect(() => {
    let fetch = async () => {
      const result = await getArtists(selectedBooking.artists);
      setArtists(result.data);
      console.log(result.data);
    };
    fetch();
  }, []);
  const onHandleAddToBooking = async (artist) => {
    let item = {
      artist_id: artist.id,
      artist: artist,
      event_ids: [selectedBooking.id],
    };
    let list = [...addToBookingList];
    list.push(item);
    dispatch(
      EventsActions.onChangeUserItem({
        element: "addToBookingList",
        data: list,
      })
    );
  };
  const onHandleRebooking = () => {
    props.navigation.navigate("Cart");
  };
  return (
    <ScrollView>
      <View style={Styles.profile.bookingHistoryArtists}>
        <Text style={Styles.discover.cardTitle}>
          {"  "}Bookings For {selectedBooking.event_name}
        </Text>
        {Artists.length > 0 &&
          Artists?.map((item, index) => (
            <EventArtist
              key={index}
              artist={item}
              onHandleAddToBooking={onHandleAddToBooking}
              {...props}
            />
          ))}
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={Styles.AuthStyles.authButton}
          onPress={() => onHandleRebooking()}
        >
          <Text style={{ color: "white", fontSize: 14 }}> Re-book</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EventArtists;
