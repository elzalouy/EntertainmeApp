import React from "react";
import { Image, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AntIcon from "react-native-vector-icons/AntDesign";
import { Styles } from "../../style";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/Input1";
import CartOptions from "./CartOptions";
import CartArtist from "../../../components/CartArtist";
import { EventsActions } from "../../../store/Events";

const Form3 = (props) => {
  const dispatch = useDispatch();
  const { cart, error } = useSelector((state) => state.Events);
  const onHandleChange = (text, name) => {
    let Cart = { ...cart };
    Cart[name] = text;
    dispatch(EventsActions.onChangeUserItem({ element: "cart", data: Cart }));
  };
  const onHandleNext = () => {
    props.navigation.navigate("Form4");
  };
  return (
    <ScrollView>
      <CartOptions {...props} />
      <View style={Styles.profile.bookingHistoryArtists}>
        <CartArtist {...props} />
        <View style={Styles.cart.formContainer}>
          <Text style={Styles.Booking.screenLabel}>Contact Information</Text>
          <Input
            name="name"
            value={cart.name}
            title="Name"
            placeholder="Name"
            onHandleChange={onHandleChange}
          />
          <Input
            name="email"
            value={cart.email}
            title="Email"
            placeholder="Email"
            onHandleChange={onHandleChange}
          />
          <Input
            name="phone_number"
            value={cart.phone_number}
            title="Phone Number"
            placeholder="Phone Number"
            onHandleChange={onHandleChange}
          />
          <Input
            name="additional_info"
            value={cart.additional_info}
            title="Additional Info"
            placeholder="Additional Info"
            onHandleChange={onHandleChange}
          />
          <Text style={{ color: "#ff671d" }}>{error}</Text>
          <TouchableOpacity
            style={Styles.AuthStyles.authButton}
            onPress={() => onHandleNext()}
          >
            <Text style={{ color: "white" }}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Form3;
