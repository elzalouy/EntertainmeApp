import React, { useEffect, useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { Styles } from "../screens/style";
import AntIcon from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/AntDesign";
import { APIUrl } from "../httpServices/http.json";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import AddToBookingNames from "./addToBookingNames";
import { EventsActions } from "../store/Events";
import { removeFavourite, setFavourite } from "../httpServices/favourites";
import { FavoritesActions } from "../store/Favorites";
import { UiActions } from "../store/Ui";
const AddToBooking = (props) => {
  const dispatch = useDispatch();
  const { addToBookingModal, logged } = useSelector((state) => state.UI);
  const { favourites } = useSelector((state) => state.Favorites);
  const { currentBooking, addToBookingList } = useSelector(
    (state) => state.Events
  );

  const onChangeCart = (id) => {
    let current = { ...currentBooking };
    let eventIndex = current.event_ids.findIndex((item) => item === id);
    if (eventIndex === -1) current.event_ids = [...current.event_ids, id];
    else current.event_ids = current.event_ids.filter((item) => item !== id);
    let list = [...addToBookingList];
    list = list.filter((item) => item.artist_id !== current.artist_id);
    list.push(current);
    dispatch(
      EventsActions.onChangeUserItems([
        { element: "addToBookingList", data: list },
        { element: "currentBooking", data: current },
      ])
    );
  };
  const onHandleLike = async () => {
    if (!logged) {
      setVisible(!addToBookingModal);
    } else {
      let result = await setFavourite(currentBooking?.artist_id);
      dispatch(
        FavoritesActions.setFavorite({
          artist_id: parseInt(result.data.item.artist_id),
          created_at: result.data.item.created_at,
          id: parseInt(result.data.item.id),
          updated_at: result.data.item.updated_at,
          user_id: result.data.item.user_id,
        })
      );
    }
  };
  const onHandleDisLike = async () => {
    if (!logged) {
      setVisible(!addToBookingModal);
    } else {
      await removeFavourite(currentBooking?.artist_id);
      dispatch(FavoritesActions.removeFavourite(currentBooking?.artist_id));
    }
  };
  const setVisible = (val) => {
    if (!logged) {
      dispatch(
        UiActions.onHandleUiChange([{ element: "authModal", value: val }])
      );
    } else {
      dispatch(
        UiActions.onHandleUiChange([
          { element: "addToBookingModal", value: val },
        ])
      );
    }
  };
  return (
    <Modal visible={addToBookingModal} animationType="slide" transparent={true}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={Styles.discover.addToBooking}>
          <View style={Styles.discover.closeModal}>
            <AntIcon
              name="close"
              color="white"
              size={22}
              onPress={() => setVisible(false)}
            />
          </View>
          {/* Artist */}
          <View
            key={currentBooking?.artist.id}
            style={Styles.profile.bookingForItem}
          >
            <Image
              style={Styles.profile.bookingForItemImage}
              source={APIUrl + currentBooking?.artist.image}
            />
            <Text style={Styles.profile.bookingForItemCategory}>Category</Text>
            <View style={Styles.profile.bookingForItemContent}>
              <Text style={Styles.profile.bookingForItemTitle}>
                {currentBooking?.artist.name}
              </Text>
              <Text style={Styles.profile.bookingForItemDesc} numberOfLines={2}>
                {currentBooking?.artist.description}
              </Text>
              {favourites.findIndex(
                (obj) => obj.artist_id === currentBooking?.artist_id
              ) >= 0 ? (
                <TouchableOpacity
                  style={Styles.profile.bookingForItemButton}
                  onPress={() => onHandleDisLike()}
                >
                  <Text style={{ color: "#FF671D", fontSize: 13 }}>
                    <Icon name="heart" style={{ fontSize: 16 }} /> Remove
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={Styles.profile.bookingForItemButton}
                  onPress={() => onHandleLike()}
                >
                  <Text style={{ color: "#FF671D", fontSize: 13 }}>
                    <Icon name="hearto" style={{ fontSize: 16 }} /> Add To
                    Favourites
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* End of Artist */}
          <View style={Styles.discover.addToBookinDetails}>
            <Text style={Styles.discover.cardTitle}>
              Select from recent events
            </Text>
            <Text style={Styles.defaultStyles.grayText}>Recent Events:</Text>
            <AddToBookingNames onChangeCartEvent={onChangeCart} {...props} />
            <TouchableOpacity
              style={Styles.defaultStyles.flexContainer}
              onPress={() => {
                setVisible(false);
                props.navigation.navigate("Booking", {
                  screen: "EntertainForm",
                });
              }}
            >
              <AntIcon
                name="plus"
                style={Styles.discover.addToBookingBtnIcon}
                color="white"
                size={16}
              />
              <Text style={Styles.discover.addToBookingBtnText}>
                {" "}
                Add New Project
              </Text>
            </TouchableOpacity>
            <View style={Styles.discover.addToBookingBtnContainer}>
              <TouchableOpacity
                style={Styles.defaultStyles.button}
                onPress={() => {
                  setVisible(false);
                  props.navigation.navigate("Cart");
                }}
              >
                <IonIcon
                  name="cart-outline"
                  style={Styles.discover.artistIcon}
                />
                <Text style={{ color: "white" }}>Add To Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddToBooking;
