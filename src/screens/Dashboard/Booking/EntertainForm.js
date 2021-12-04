import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { Styles as styles } from "../../style";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import StepIndicator from "./StepIndicator";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../../../store/Ui";
import { EventsActions } from "../../../store/Events";
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
const EntertainForm = (props) => {
  const dispatch = useDispatch();
  const { bookEvent } = useSelector((state) => state.Events);
  const onPressNext = () => {
    dispatch(
      UiActions.onHandleUiChange([{ element: "formIndicator", value: 1 }])
    );
    props.navigation.navigate("EventDetailsForm");
  };
  const onChangeAdditionalServices = (item) => {
    dispatch(
      EventsActions.onHandleBookEventArray({
        element: "additional_equipment",
        value: item,
      })
    );
  };
  const onChangeProductionItems = (item) => {
    dispatch(
      EventsActions.onHandleBookEventArray({
        element: "items_of_production",
        value: item,
      })
    );
  };
  return (
    <FlatList
      data={[{}]}
      renderItem={() => (
        <>
          <StepIndicator {...props} />
          <View style={styles.defaultStyles.container}>
            <View style={styles.Booking.formContainer}>
              <View style={styles.Booking.Line}>
                <Text style={styles.Booking.screenLabel}>
                  What Type of entertainment are you looking for?
                </Text>
                <Text style={styles.Booking.label}>Additional Services</Text>
                <FlatList
                  listKey={(item, index) => index.toString()}
                  numColumns={2}
                  horizontal={false}
                  data={additonal_services}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.Booking.selectItem}>
                        <View
                          style={styles.defaultStyles.flexContainer}
                          onTouchEnd={() => onChangeAdditionalServices(item)}
                        >
                          {bookEvent.additional_equipment.indexOf(item) >= 0 ? (
                            <Icon
                              name="square"
                              style={styles.Booking.selectIcon}
                            />
                          ) : (
                            <Icon
                              name="square-o"
                              style={styles.Booking.selectIcon}
                            />
                          )}
                          <Text style={{ color: "white" }}> {item}</Text>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
              <Text style={styles.Booking.label}>Production</Text>
              <FlatList
                listKey={(item, index) => index.toString()}
                numColumns={2}
                horizontal={false}
                data={production}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.Booking.selectItem}>
                      <View
                        style={styles.defaultStyles.flexContainer}
                        onTouchEnd={() => onChangeProductionItems(item)}
                      >
                        {bookEvent.items_of_production &&
                        bookEvent.items_of_production.indexOf(item) >= 0 ? (
                          <Icon
                            name="square"
                            style={styles.Booking.selectIcon}
                          />
                        ) : (
                          <Icon
                            name="square-o"
                            style={styles.Booking.selectIcon}
                          />
                        )}
                        <Text style={{ color: "white" }}> {item}</Text>
                      </View>
                    </View>
                  );
                }}
              />
              <TouchableOpacity
                style={styles.AuthStyles.authButton}
                onPress={() => onPressNext()}
              >
                <Text style={{ color: "white" }}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    />
  );
};

export default EntertainForm;
