import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Styles } from "../../style";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontIcon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import Input from "../../../components/Input1";
import { useDispatch, useSelector } from "react-redux";
import { APIUrl } from "../../../httpServices/http.json";
import CartOptions from "./CartOptions";
import CartArtist from "../../../components/CartArtist";
import { EventsActions } from "../../../store/Events";
const Form2 = (props) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.Events);
  const [show, setshow] = useState(false);
  const onHandleChange = (text, name) => {
    let Cart = { ...cart };
    Cart[name] = text;
    dispatch(EventsActions.onChangeUserItem({ element: "cart", data: Cart }));
  };
  const onHandleChangeDate = (date) => {
    setshow(false);
    if (date) {
      let Cart = { ...cart };
      Cart.date = new Date(date).toLocaleDateString();
      dispatch(EventsActions.onChangeUserItem({ element: "cart", data: Cart }));
    }
  };
  const onPressNext = () => {
    props.navigation.navigate("Form3");
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <CartOptions {...props} />
      <View style={Styles.profile.bookingHistoryArtists}>
        <CartArtist {...props} />
        <View style={Styles.cart.formContainer}>
          <Text style={Styles.Booking.screenLabel}>Event Details</Text>
          <Input
            name="event_name"
            value={cart.event_name}
            title="Event Name"
            placeholder="Event Name"
            onHandleChange={onHandleChange}
          />
          <Input
            name="description"
            value={cart.description}
            title="Event Description"
            placeholder="Event Description"
            multiline={true}
            numberOfLines={4}
            onHandleChange={onHandleChange}
          />
          <Input
            name="address"
            value={cart.address}
            title="Event Address"
            placeholder="Event Address"
            onHandleChange={onHandleChange}
          />
          <Text style={Styles.AuthStyles.authText}>Event Date</Text>
          <TouchableOpacity
            style={Styles.cart.authInput}
            onPress={() => setshow(!show)}
          >
            <Text style={{ color: "white", paddingVertical: 14 }}>
              {cart.date
                ? `${new Date(cart.date).toLocaleDateString()}`
                : "Event Date"}
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={cart.date ? new Date(cart.date) : new Date()}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, date) => onHandleChangeDate(date)}
              dateFormat="day month year"
            />
          )}
          <Input
            name="guests"
            value={cart.guests}
            title="Number of Guests"
            placeholder="Number of Guests"
            onHandleChange={onHandleChange}
          />
          <View style={Styles.defaultStyles.flexContainer}>
            <View
              style={Styles.defaultStyles.flexContainer}
              onTouchEnd={() =>
                onHandleChange(
                  cart.placement === "indoor" ? "outdoor" : "indoor",
                  "placement"
                )
              }
            >
              <FontIcon
                name={cart.placement === "indoor" ? "square" : "square-o"}
                size={16}
                color="#ff671d"
                style={Styles.AuthStyles.authCheckBox}
              />
              <Text style={Styles.AuthStyles.authText}>Indoor</Text>
              <FontIcon
                name={cart.placement === "outdoor" ? "square" : "square-o"}
                size={16}
                color="#ff671d"
                style={Styles.AuthStyles.authCheckBox}
              />
              <Text style={Styles.AuthStyles.authText}>OutDoor</Text>
            </View>
          </View>

          <Input
            name="duration"
            value={cart.duration}
            title="Performing Hours"
            placeholder="0"
            onHandleChange={onHandleChange}
          />
          <View
            style={Styles.defaultStyles.flexContainer}
            onTouchEnd={() =>
              onHandleChange(
                cart.duration_tbd === true ? false : true,
                "duration_tbd"
              )
            }
          >
            <FontIcon
              name={cart.duration_tbd ? "square" : "square-o"}
              size={16}
              color="#ff671d"
              style={Styles.AuthStyles.authCheckBox}
            />
            <Text style={Styles.AuthStyles.authText}>To Be Discussed</Text>
          </View>
          <Input
            name="budget"
            value={cart.budget}
            title="Budget"
            placeholder="Budget"
            onHandleChange={onHandleChange}
          />
          <View
            style={Styles.defaultStyles.flexContainer}
            onTouchEnd={() =>
              onHandleChange(cart.budget_tbd ? false : true, "budget_tbd")
            }
          >
            <FontIcon
              name={cart.budget_tbd ? "square" : "square-o"}
              size={16}
              color="#ff671d"
              style={Styles.AuthStyles.authCheckBox}
            />
            <Text style={Styles.AuthStyles.authText}>To Be Discussed</Text>
          </View>
          <TouchableOpacity
            style={Styles.AuthStyles.authButton}
            onPress={() => onPressNext()}
          >
            <Text style={{ color: "white" }}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Form2;
