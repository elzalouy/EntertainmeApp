import React, { useEffect, useState } from "react";
import { Image, Text, View, ViewBase } from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontIcon from "react-native-vector-icons/FontAwesome";
import { Styles } from "../../style";
import CartOptions from "./CartOptions";
import { EventsActions } from "../../../store/Events";
import CartArtist from "../../../components/CartArtist";
import _ from "lodash";
import { getArtists } from "../../../httpServices/artists";
const additonal_services = [
  "Sound",
  "Led Screens",
  "Stage Management",
  "Ushers",
  "Permits",
  "Venu Rental",
  "Location Renting",
  "Walkie Talkies",
  "Light",
  "Mojo Barriers",
  "Photography",
  "Security",
  "Social Media Coverage",
  "Catering",
  "AR (Augmented Reality)",
  "Other",
  "Stage",
  "Generators",
  "Videography",
  "On Ground Operations Team",
  "Seating arrangements",
  "VR (Virtual Reality)",
  "3D Mapping",
];
const production = [
  "Counters/Desk",
  "Trusses",
  "Flags",
  "Uniforms",
  "Flyers",
  "Brochures",
  "Booths",
  "Backdrop",
  "Decorations",
  "Branded Car/Truck",
  "Directional Signs",
  "Giveaways",
  "Gate",
  "Mockups",
  "Bracelets",
  "Banners",
  "Printed Invitations",
  "Other",
];

const Form1 = (props) => {
  const dispatch = useDispatch();
  const { userBookings, cart, addToBookingList } = useSelector(
    (state) => state.Events
  );
  const onHandleChangeAddEq = (value) => {
    let adds = [...cart.additional_equipment];
    if (adds.findIndex((item) => item === value) >= 0) {
      adds = adds.filter((item) => item !== value);
    } else {
      adds.push(value);
    }
    let Cart = { ...cart };
    Cart.additional_equipment = adds;
    dispatch(EventsActions.onChangeUserItem({ element: "cart", data: Cart }));
  };
  const onHandleChangeProd = (value) => {
    let prods = [...cart.items_of_production];
    if (prods.findIndex((item) => item === value) >= 0) {
      prods = prods.filter((item) => item !== value);
    } else {
      prods.push(value);
    }
    let Cart = { ...cart };
    Cart.items_of_production = prods;
    dispatch(EventsActions.onChangeUserItem({ element: "cart", data: Cart }));
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <CartOptions {...props} />
        <View style={Styles.profile.bookingHistoryArtists}>
          <CartArtist {...props} />
          <View style={Styles.cart.formContainer}>
            <Text style={Styles.Booking.label}>Additional Services</Text>
            <FlatList
              key="additional_services"
              listKey={(item, index) => index.toString()}
              numColumns={2}
              horizontal={false}
              data={additonal_services}
              renderItem={({ item, index }) => {
                return (
                  <View style={Styles.cart.selectItem}>
                    <View
                      style={Styles.defaultStyles.flexContainer}
                      onTouchEnd={() => onHandleChangeAddEq(item)}
                    >
                      {cart?.additional_equipment?.indexOf(item) >= 0 ? (
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
            <Text style={Styles.Booking.label}>Production</Text>
            <FlatList
              key="productions"
              listKey={(item, index) => index.toString()}
              numColumns={2}
              horizontal={false}
              data={production}
              renderItem={({ item, index }) => {
                return (
                  <View style={Styles.cart.selectItem}>
                    <View
                      style={Styles.defaultStyles.flexContainer}
                      onTouchEnd={() => onHandleChangeProd(item)}
                    >
                      {cart?.items_of_production?.indexOf(item) >= 0 ? (
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
                        {" "}
                        {item}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
            <TouchableOpacity
              style={Styles.AuthStyles.authButton}
              onPress={() => props.navigation.navigate("Form2")}
            >
              <Text style={{ color: "white" }}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Form1;
