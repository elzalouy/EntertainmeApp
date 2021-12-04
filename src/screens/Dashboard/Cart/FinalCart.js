import React, { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Styles } from "../../style";
import { useDispatch, useSelector } from "react-redux";
import FontIcon from "react-native-vector-icons/FontAwesome";
import CartArtist from "../../../components/CartArtist";
import { EventsActions } from "../../../store/Events";
const FinalCart = (props) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.Events);
  const { addToBookingModal } = useSelector((state) => state.UI);
  useEffect(() => {
    dispatch(
      EventsActions.onChangeUserItem({
        element: "selectedArtist",
        data: props.route.params.artist,
      })
    );
  }, [props]);
  return (
    <ScrollView style={addToBookingModal && { opacity: 0.2 }}>
      <View style={Styles.profile.bookingHistoryArtists}>
        <CartArtist {...props} />
        <View style={Styles.cart.formContainer}>
          {cart?.additional_equipment?.length > 0 && (
            <>
              <Text style={Styles.Booking.label}>Additional Services</Text>
              <FlatList
                key="additional_services"
                listKey={(item, index) => index.toString()}
                numColumns={2}
                horizontal={false}
                data={cart?.additional_equipment}
                renderItem={({ item, index }) => {
                  return (
                    <View style={Styles.cart.selectItem}>
                      <View style={Styles.defaultStyles.flexContainer}>
                        {cart?.additional_equipment.indexOf(item) >= 0 ? (
                          <FontIcon
                            name="square"
                            style={Styles.Booking.selectIcon}
                          />
                        ) : (
                          <FontIcon
                            name="square-o"
                            style={Styles.Booking.selectIcon}
                          />
                        )}
                        <Text style={{ color: "white", fontSize: 10 }}>
                          {item}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </>
          )}
          {cart?.items_of_production?.length > 0 && (
            <>
              <Text style={Styles.Booking.label}>Production Items</Text>
              <FlatList
                key="additional_services"
                listKey={(item, index) => index.toString()}
                numColumns={2}
                horizontal={false}
                data={cart?.items_of_production}
                renderItem={({ item, index }) => {
                  return (
                    <View style={Styles.cart.selectItem}>
                      <View style={Styles.defaultStyles.flexContainer}>
                        {cart?.items_of_production.indexOf(item) >= 0 ? (
                          <FontIcon
                            name="square"
                            style={Styles.Booking.selectIcon}
                          />
                        ) : (
                          <FontIcon
                            name="square-o"
                            style={Styles.Booking.selectIcon}
                          />
                        )}
                        <Text style={{ color: "white", fontSize: 10 }}>
                          {item}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </>
          )}
          <View style={Styles.cart.contentWrapper}>
            <Text style={Styles.Booking.label}>Event Details</Text>
            <Text style={Styles.Booking.label}>Event Name</Text>
            <Text style={Styles.profile.bookingForItemDesc}>
              {cart.event_name}
            </Text>
            <Text style={Styles.Booking.label}>Event Desc</Text>
            <Text style={Styles.profile.bookingForItemDesc}>
              {cart.description}
            </Text>
            <Text style={Styles.Booking.label}>Event Date</Text>
            <Text style={Styles.profile.bookingForItemDesc}>
              {cart.date
                ? `${new Date(cart.date).toLocaleDateString()}`
                : "Event Date"}
            </Text>
            <Text style={Styles.Booking.label}>Number of Guests</Text>
            <Text style={Styles.profile.bookingForItemDesc}>
              {cart.date
                ? `${new Date(cart.date).toLocaleDateString()}`
                : "Event Date"}
            </Text>
            <Text style={Styles.Booking.label}>Location</Text>
            <Text style={Styles.profile.bookingForItemDesc}>
              {cart.address}
            </Text>
            <Text style={Styles.Booking.label}>Performing Hours</Text>
            <Text style={Styles.profile.bookingForItemDesc}>
              {cart.duration} Hours
            </Text>
          </View>
          <Text style={Styles.Booking.label}>Contact Information</Text>
          <Text style={Styles.Booking.label}>Name</Text>
          <Text style={Styles.profile.bookingForItemDesc}>{cart.name}</Text>
          <Text style={Styles.Booking.label}>Email</Text>
          <Text style={Styles.profile.bookingForItemDesc}>
            {cart?.email ? cart.email : "Email Not inserted"}
          </Text>
          <Text style={Styles.Booking.label}>Phone Number</Text>
          <Text style={Styles.profile.bookingForItemDesc}>
            {cart?.contact_phone ? cart.contact_phone : "Phone Not inserted"}
          </Text>
          <Text style={Styles.Booking.label}>Phone Number</Text>
          <Text style={Styles.profile.bookingForItemDesc}>
            {cart?.additional_info ? cart.additional_info : " Not inserted"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={Styles.cart.submitArtistBtn}
        onPress={() => props.navigation.navigate("Submit")}
      >
        <View style={Styles.defaultStyles.flexContainer}>
          <Text style={{ color: "white" }}>Save</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FinalCart;
