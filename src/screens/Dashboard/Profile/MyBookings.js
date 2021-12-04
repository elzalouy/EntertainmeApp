import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RecentEventName from '../../../components/RecentEventNames';
import {Styles} from '../../style';
import {updateOrder} from '../../../httpServices/event';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {getDate} from '../../../utils/formatDate';
import _ from 'lodash';
import {EventsActions} from '../../../store/Events';
import {APIUrl} from '../../../httpServices/http.json';
const h = Dimensions.get('screen').height;
const MyBookings = props => {
  const dispatch = useDispatch();
  let {userBookings, selectedBooking, addToBookingList} = useSelector(
    state => state.Events,
  );
  useEffect(() => {
    dispatch(
      EventsActions.onChangeUserItem({
        element: 'selectedBooking',
        data: userBookings[0],
      }),
    );
  }, []);
  let [EventsNames, setNames] = useState([]);
  let {featuredArtists} = useSelector(state => state.Artists);

  const onHandleAddToBooking = async artist => {
    let item = {
      artist_id: artist.id,
      artist: artist,
      event_ids: [selectedBooking.id],
    };
    let list = [...addToBookingList];
    list.push(item);
    dispatch(
      EventsActions.onChangeUserItem({
        element: 'addToBookingList',
        data: list,
      }),
    );
  };

  const onSelectBooking = id => {
    let selected = userBookings.find(item => item.id === id);
    dispatch(
      EventsActions.onChangeUserItem({
        element: 'selectedBooking',
        data: selected,
      }),
    );
  };
  return (
    <ScrollView>
      {userBookings?.length > 0 ? (
        <>
          <View style={Styles.defaultStyles.container}>
            <Text style={Styles.discover.title}>Upcoming Events</Text>
            <Text style={Styles.artist.artistDescription}>
              Choose recent event
            </Text>
          </View>
          <RecentEventName {...props} />
          <View style={Styles.profile.bookingForMenu}>
            <View style={Styles.profile.recentEventNameList}>
              <Text style={Styles.discover.cardTitle}>
                Booking For {selectedBooking?.event_name}
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={Styles.profile.recentEventNameList}>
              {featuredArtists?.map(item => (
                <View key={item.id} style={Styles.profile.bookingForItem}>
                  <Image
                    style={Styles.profile.bookingForItemImage}
                    source={APIUrl + item.image}
                  />
                  <Text style={Styles.profile.bookingForItemCategory}>
                    Category
                  </Text>
                  <View style={Styles.profile.bookingForItemContent}>
                    <Text style={Styles.profile.bookingForItemTitle}>
                      {item.name}
                    </Text>
                    <Text
                      style={Styles.profile.bookingForItemDesc}
                      numberOfLines={2}>
                      {item.description}
                    </Text>
                    {addToBookingList.length > 0 &&
                    addToBookingList?.find(
                      i =>
                        i.artist_id === item.id &&
                        i.event_ids.findIndex(n => n === selectedBooking.id) >=
                          0,
                    ) ? (
                      <TouchableOpacity
                        style={Styles.profile.bookingForItemButtonAdded}>
                        <Text style={{color: 'white', fontSize: 12}}>
                          <IonIcon name="cart-outline" style={{fontSize: 16}} />{' '}
                          Added to Cart
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={Styles.profile.bookingForItemButton}
                        onPress={() => onHandleAddToBooking(item)}>
                        <Text style={{color: '#FF671D', fontSize: 12}}>
                          <IonIcon name="cart-outline" style={{fontSize: 16}} />{' '}
                          Add To Booking
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={Styles.defaultStyles.container}>
            <View style={{marginTop: h * 0.01}}>
              <Text style={Styles.artist.artistDescription}>
                History of Bookings
              </Text>
              {userBookings?.map(item => {
                let date = getDate(item.date);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={Styles.profile.bookingHistory}
                    onPress={() => {
                      onSelectBooking(item.id);
                      props.navigation.navigate('EventArtists');
                    }}>
                    <Image style={Styles.profile.bookingHistoryImage} />
                    <View style={Styles.profile.bookingHistoryContent}>
                      <Text style={{color: '#818181', fontSize: 11}}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        {item.event_name}
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                        }}>{`${date.day} ${date.month} ,${date.year}`}</Text>
                    </View>
                    <Text style={Styles.profile.bookingHistoryArtistsLink}>
                      {item.artists?.length || 0} Artists
                      <AntIcon name="right" />
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </>
      ) : (
        <Text style={{color: 'gray', padding: 30, textAlign: 'center'}}>
          No Events Yet!
        </Text>
      )}
    </ScrollView>
  );
};
export default MyBookings;
