import React from "react";
import { Text, View } from "react-native";
import { Styles } from "../style";

const AboutUs = () => {
  return (
    <View style={Styles.settings.container}>
      <View style={Styles.settings.AboutUs}>
        <Text style={Styles.settings.AboutUsText}>About us</Text>
      </View>
      <Text style={Styles.settings.AboutUsInfo}>
        The quick, brown fox jumps over a lazy dog. DJs flock. The quick, brown
        fox jumps over a lazy dog. DJs flock. The quick, brown fox jumps over a
        lazy dog. DJs flock.
      </Text>
      <View style={Styles.settings.AboutUs}>
        <Text style={Styles.settings.AboutUsText}>Our History</Text>
      </View>
      <Text style={Styles.settings.AboutUsInfo}>
        The quick, brown fox jumps over a lazy dog. DJs flock. The quick, brown
        fox jumps over a lazy dog. DJs flock. The quick, brown fox jumps over a
        lazy dog. DJs flock.
      </Text>
    </View>
  );
};

export default AboutUs;
