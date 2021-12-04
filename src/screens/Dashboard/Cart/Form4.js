import React, { useState } from "react";
import { Image, Modal, Text, View, TouchableOpacity } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AntIcon from "react-native-vector-icons/AntDesign";
import { Styles } from "../../style";
import { useDispatch, useSelector } from "react-redux";
import FontIcon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import ArtistCard from "../../../components/ArtistCard";
import CartOptions from "./CartOptions";
import CartArtist from "../../../components/CartArtist";
import { EventsActions } from "../../../store/Events";
const Form4 = (props) => {
  const dispatch = useDispatch();
  const { cart, carts } = useSelector((state) => state.Events);
  const { addToBookingModal } = useSelector((state) => state.UI);
  const { featuredArtists } = useSelector((state) => state.Artists);
  const [Visible, setVisible] = useState(false);
  const submitArtist = () => {
    let newCart = { ...cart, submited: true };
    let index = carts.findIndex((item) => item.id === newCart.id);
    let newCarts = [...carts];
    newCarts[index] = newCart;
    newCart = newCarts.find((item) => item.submited !== true);
    if (newCart) {
      dispatch(
        EventsActions.onChangeUserItems([
          { element: "carts", data: newCarts },
          { element: "cart", data: newCart },
        ])
      );
      props.navigation.navigate("Form1");
    } else {
      dispatch(
        EventsActions.onChangeUserItem({
          element: "addToBookingList",
          data: [],
        })
      );
    }
  };
  return (
    <ScrollView style={addToBookingModal && { opacity: 0.2 }}>
      <CartOptions {...props} />
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
        onPress={() => submitArtist()}
      >
        <View style={Styles.defaultStyles.flexContainer}>
          <Text style={{ color: "white" }}>Submit This Cart</Text>
          <FeatherIcon
            name="arrow-right"
            style={Styles.cart.submitArtistIcon}
          />
        </View>
      </TouchableOpacity>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={Styles.cart.suggestedArtists}
      >
        {featuredArtists?.map((item, index) => (
          <ArtistCard
            navigation={props.navigation}
            item={item}
            key={index}
            width={0.45}
            backgroundColor={"#2D2D2D"}
            onTouchEnd={() => navigation.navigate("Artist", { id: item.id })}
          />
        ))}
      </ScrollView>
      <Modal visible={Visible} animationType="slide" transparent={true}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={Styles.settings.modal}>
            <Text style={Styles.settings.modalText}>
              Request sent successfully
            </Text>
            <TouchableOpacity
              style={Styles.settings.modalBtnCancel}
              onPress={() => {
                setVisible(false);
                props.navigation.navigate("Discover", { screen: "Home" });
              }}
            >
              <Text style={{ color: "white" }}>Discover more</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Form4;
