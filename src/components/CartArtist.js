import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Styles } from "../screens/style";
import AntIcon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { removeFavourite, setFavourite } from "../httpServices/favourites";
import { EventsActions } from "../store/Events";
import { FavoritesActions } from "../store/Favorites";
import { APIUrl } from "../httpServices/http.json";
import _ from "lodash";
const CartArtist = (props) => {
  const dispatch = useDispatch();
  const { selectedArtist, cart } = useSelector((state) => state.Events);
  const { favourites } = useSelector((state) => state.Favorites);
  const onPressLike = async () => {
    let result = await setFavourite(selectedArtist.id);
    if (result.data) {
      dispatch(FavoritesActions.setFavorite({ artist_id: selectedArtist.id }));
    }
  };
  const onPressDisLike = async () => {
    const result = await removeFavourite(selectedArtist.id);
    if (result.data) {
      dispatch(FavoritesActions.removeFavourite(selectedArtist.id));
    }
  };
  const onPressDelete = () => {
    let currentArtists = [...cart.artists];
    console.log(selectedArtist.id);
    _.remove(currentArtists, (item) => item === selectedArtist.id);
    let newCart = { ...cart };
    newCart.artists = currentArtists;
    dispatch(
      EventsActions.onChangeUserItem({ element: "cart", data: newCart })
    );
  };
  return (
    <View style={Styles.cart.cartArtist}>
      <Image
        style={Styles.profile.bookingForItemImage}
        source={APIUrl + selectedArtist?.image}
      />
      <Text style={Styles.profile.bookingForItemCategory}>Category</Text>
      <View style={Styles.profile.bookingForItemContent}>
        <Text style={Styles.profile.bookingForItemTitle}>
          {selectedArtist?.name}
        </Text>
        <Text style={Styles.profile.bookingForItemDesc} numberOfLines={3}>
          {selectedArtist?.description}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          {favourites?.findIndex(
            (item) => item.artist_id === selectedArtist?.id
          ) < 0 ? (
            <TouchableOpacity
              style={Styles.cart.likeRemoveIcon}
              onPress={() => onPressLike()}
            >
              <AntIcon name="hearto" style={Styles.discover.heart} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={Styles.cart.likeRemoveIcon}
              onPress={() => onPressDisLike()}
            >
              <AntIcon name="heart" style={Styles.discover.heart} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={Styles.cart.likeRemoveIcon}
            onPress={() => onPressDelete()}
          >
            <AntIcon name="delete" style={Styles.discover.heart} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartArtist;
