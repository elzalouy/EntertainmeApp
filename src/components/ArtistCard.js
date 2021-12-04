import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Text, View, TouchableOpacity} from 'react-native';
import {Discover as styles} from '../screens/style';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import {normalize} from 'react-native-elements';
import {APIUrl} from '../httpServices/http.json';
import {getArtist} from '../httpServices/artists';
import {EventsActions} from '../store/Events';
import {useDispatch, useSelector} from 'react-redux';
import AddToBooking from './addToBooking';
import AuthRequiredModal from './AuthRequiredModal';
import {UiActions} from '../store/Ui';
import _ from 'lodash';
import {removeFavourite, setFavourite} from '../httpServices/favourites';
import {FavoritesActions} from '../store/Favorites';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

const ArtistCard = ({
  item,
  width,
  margin,
  height,
  name,
  onTouchEnd,
  added,
  navigation,
  padding,
  backgroundColor,
}) => {
  const dispatch = useDispatch();
  const {logged} = useSelector(state => state.UI);
  const {favourites} = useSelector(state => state.Favorites);
  const {AddToBookingList} = useSelector(state => state.Events);
  const onAddToBooking = async () => {
    if (logged) {
      dispatch(
        EventsActions.onAddToBooking({
          artist_id: item.id,
          artist: item,
          event_ids: [],
        }),
      );
      dispatch(
        EventsActions.onChangeUserItem({
          element: 'currentBooking',
          data: {
            artist_id: item.id,
            artist: item,
            event_ids: [],
          },
        }),
      );
    }
    setVisible(true);
  };
  const setVisible = val => {
    if (!logged) {
      dispatch(
        UiActions.onHandleUiChange([{element: 'authModal', value: val}]),
      );
    } else {
      dispatch(
        UiActions.onHandleUiChange([
          {element: 'addToBookingModal', value: val},
        ]),
      );
    }
  };
  const onHandleLike = async () => {
    if (!logged) {
      setVisible(!Visible);
    } else {
      let result = await setFavourite(item.id);
      dispatch(
        FavoritesActions.setFavorite({
          artist_id: parseInt(result.data.item.artist_id),
          created_at: result.data.item.created_at,
          id: parseInt(result.data.item.id),
          updated_at: result.data.item.updated_at,
          user_id: result.data.item.user_id,
        }),
      );
    }
  };
  const onHandleDisLike = async () => {
    if (!logged) {
      setVisible(!Visible);
    } else {
      await removeFavourite(item.id);
      dispatch(FavoritesActions.removeFavourite(item.id));
    }
  };
  return (
    <View
      style={[
        styles.discover.artistItem,
        {
          backgroundColor: backgroundColor && backgroundColor,
          width: width ? normalize(w * width) : normalize(w * 0.6),
          padding: padding >= 0 ? padding : 3,
          margin: margin >= 0 ? h * margin : h * 0.01,
        },
      ]}>
      <View onTouchEnd={onTouchEnd}>
        <Image
          source={{uri: APIUrl + item.Image}}
          style={styles.discover.artistImage}></Image>
      </View>
      <View style={styles.discover.heartSection}>
        <View style={styles.discover.artistCategory}>
          <Text style={{color: '#FF671D'}}>{name ? name : 'Category'}</Text>
        </View>
        {favourites.findIndex(obj => obj.artist_id === item.id) >= 0 ? (
          <TouchableOpacity onPress={() => onHandleDisLike()}>
            <Icon name="heart" style={styles.discover.heart} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => onHandleLike()}>
            <Icon name="hearto" style={styles.discover.heart} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.discover.artisDesc}>
        <Text style={styles.discover.artistTitle}>{item.name}</Text>
        <Text style={styles.discover.artistDesc} numberOfLines={3}>
          {item.description}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.defaultStyles.button}
        onPress={() => onAddToBooking(item)}>
        {added ? (
          <Text style={{color: 'white'}}>Added</Text>
        ) : (
          <>
            <IonIcon name="cart-outline" style={styles.discover.artistIcon} />
            <Text style={{color: 'white'}}>Add To Booking</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ArtistCard;
