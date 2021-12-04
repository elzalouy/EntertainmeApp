import React from "react";
import { Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ProfileLabel from "../../components/ProfileLabel";
import { Styles } from "../style";
import EntIcon from "react-native-vector-icons/Entypo";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Input from "../../components/Input";
import { useSelector } from "react-redux";

const ContactUs = (props) => {
  const { contactUs } = useSelector((state) => state.User);
  const onHandleChange = () => {};
  return (
    <ScrollView>
      <TouchableOpacity>
        <View style={Styles.profile.ProfileContainer}>
          <EntIcon
            name="location"
            color="#000000"
            size={24}
            style={Styles.profile.profileLabel}
          />
          <View style={Styles.profile.ProfileItems}>
            <Text style={Styles.settings.settingLabelText}>
              {" "}
              {"  "}
              Privacy Policy
            </Text>
            <MaterialIcon name="arrow-forward-ios" color="white" size={20} />
          </View>
        </View>
      </TouchableOpacity>
      <View style={Styles.defaultStyles.container}>
        <Input
          title="Your Name"
          onHandleChange={onHandleChange}
          name="name"
          placeholder="Your Name (Required)"
        />
        <Input
          title="Email Address"
          onHandleChange={onHandleChange}
          name="email"
          placeholder="Your Email (Required)"
        />
        <Input
          title="Send us a message"
          onHandleChange={onHandleChange}
          name="message"
          placeholder="Message"
          numberOfLines={5}
        />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={Styles.settings.ContactUsBtn}>
            <Text style={{ color: "white" }}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ContactUs;
