import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ArtistCard from '../../../components/ArtistCard';
import CartSubmitArtist from '../../../components/CartSubmitArtist';
import CartEventsNames from '../../../components/CartEventsNames';
import {Styles} from '../../style';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Header from '../Header';
import {updateOrder} from '../../../httpServices/event';
import {EventsActions} from '../../../store/Events';
import {UiActions} from '../../../store/Ui';
const Submit = props => {
  const dispatch = useDispatch();
  const {cartArtists, cart, carts} = useSelector(state => state.Events);
  const {featuredArtists} = useSelector(state => state.Artists);
  const {addToBookingModal, requestModal} = useSelector(state => state.UI);
  const onSubmitCart = async () => {
    let data = {
      additional_equipment: cart.additional_equipment,
      additional_info: cart.additional_info,
      address: cart.address,
      artist_id: cart.artist_id,
      artists: [],
      budget: cart.budget,
      budget_tbd: cart.budget_tbd,
      contact_email: cart.contact_email,
      contact_name: cart.contact_name,
      contact_phone: cart.contact_phone,
      date: cart.date,
      description: cart.description,
      duration: cart.duration,
      duration_tbd: cart.duration_tbd,
      event_name: cart.event_name,
      guests: cart.guests,
      items_of_production: cart.items_of_production,
      name: cart.name,
      others: cart.others,
      placement: cart.placement,
      type: 'booking',
    };
    const result = await updateOrder(cart.id, data);
    if (result.data) {
      let newCarts = [...carts];
      newCarts = newCarts?.filter(item => item.id !== cart.id);
      console.log(newCarts);
      if (newCarts.length === 0) {
        EventsActions.onChangeUserItems([
          {element: 'carts', data: []},
          {element: 'cart', data: null},
        ]);
        dispatch(
          UiActions.onHandleUiChange([{element: 'requestModal', value: true}]),
        );
        props.navigation.navigate('Discover');
      } else {
        dispatch(
          EventsActions.onChangeUserItems([
            {element: 'carts', data: newCarts},
            {element: 'cart', data: newCarts.length > 0 ? newCarts[0] : null},
          ]),
        );
        dispatch(
          UiActions.onHandleUiChange([{element: 'requestModal', value: true}]),
        );
      }
    }
  };
  return (
    <ScrollView style={(addToBookingModal || requestModal) && {opacity: 0.4}}>
      <Header {...props} title="My Bookings" />
      <View style={Styles.defaultStyles.mainContainer}>
        <CartEventsNames {...props} />
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
          {'  '}Booking For {cart?.name}
        </Text>
        {cartArtists?.map((item, index) => {
          return <CartSubmitArtist key={index} item={item} {...props} />;
        })}
        <TouchableOpacity
          style={Styles.cart?.submitArtistBtn}
          onPress={() => onSubmitCart()}>
          <View style={Styles.defaultStyles.flexContainer}>
            <Text style={{color: 'white'}}>Submit This Cart</Text>
            <FeatherIcon
              name="arrow-right"
              style={Styles.cart?.submitArtistIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={Styles.cart?.suggestedArtists}>
        {featuredArtists?.map((item, index) => (
          <ArtistCard
            navigation={props.navigation}
            item={item}
            key={index}
            width={0.45}
            backgroundColor={'#2D2D2D'}
            onTouchEnd={() =>
              props.navigation.navigate('Artist', {id: item.id})
            }
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default Submit;
