import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Styles} from '../../style';
import EmptyCart from './EmptyForm';
import FinalCart from './FinalCart';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import Form4 from './Form4';
import Submit from './Submit';
import _ from 'lodash';
import {EventsActions} from '../../../store/Events';
import {UiActions} from '../../../store/Ui';
import {getArtists} from '../../../httpServices/artists';
const CartStack = createStackNavigator();
const Cart = props => {
  const dispatch = useDispatch();
  const {addToBookingList, carts, cart, userBookings} = useSelector(
    state => state.Events,
  );
  useEffect(() => {
    dispatch(
      UiActions.onHandleUiChange([{element: 'cartLoading', value: true}]),
    );
    console.log(addToBookingList);
    if (addToBookingList.length > 0) {
      let Carts = [],
        events = [],
        arrayEvents = [],
        artists = [];
      // unique events
      addToBookingList?.forEach((element, index) => {
        events.push(...element.event_ids);
        arrayEvents.push(element.event_ids);
        artists.push(element.artist_id);
      });
      events = _.uniqBy(events, item => item);
      // create the Carts
      console.log(events);
      events.forEach(element => {
        let event = userBookings?.find(item => item.id === element);
        Carts.push(event);
      });
      // artists [1,2] events [[1,2],[1,2]]
      artists.forEach((artist, index) => {
        arrayEvents[index].forEach(event => {
          let cartIndex = Carts?.findIndex(item => item.id === event);
          let cart = {...Carts[cartIndex]};
          cart.artists =
            cart?.artists?.length > 0 ? [...cart.artists, artist] : [artist];
          cart.artists = _.uniqBy(cart.artists, item => item);
          Carts[cartIndex] = cart;
        });
      });
      dispatch(
        EventsActions.onChangeUserItems([
          {element: 'cart', data: Carts[0]},
          {element: 'carts', data: Carts},
        ]),
      );
    }
    dispatch(
      UiActions.onHandleUiChange([{element: 'cartLoading', value: false}]),
    );
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const result = await getArtists(cart?.artists);
      dispatch(
        EventsActions.onChangeUserItems([
          {
            element: 'cartArtists',
            data: result?.data,
          },
          {element: 'selectedArtist', data: result?.data[0]},
        ]),
      );
    };
    fetch();
  }, [cart]);

  return (
    <CartStack.Navigator
      initialRouteName="Empty"
      screenOptions={{
        headerShadowVisible: false,
        headerShown: true,
        headerStyle: Styles.categories.header,
        headerTitleStyle: Styles.profile.headerTitle,
        headerTintColor: 'white',
        headerLeftContainerStyle: Styles.categories.headerIcon,
      }}>
      {carts?.length === 0 ? (
        <CartStack.Screen
          name="Empty"
          component={EmptyCart}
          options={{headerShown: false}}
        />
      ) : (
        <>
          {addToBookingList.length > 0 ? (
            <>
              <CartStack.Screen
                name="Form1"
                component={Form1}
                options={{title: 'Bookings'}}
              />
              <CartStack.Screen
                name="Form2"
                component={Form2}
                options={{title: 'Bookings'}}
              />
              <CartStack.Screen
                name="Form3"
                component={Form3}
                options={{title: 'Bookings'}}
              />
              <CartStack.Screen
                name="Form4"
                component={Form4}
                options={{title: 'Bookings'}}
              />
            </>
          ) : (
            <>
              <CartStack.Screen
                name="Submit"
                component={Submit}
                options={{headerShown: false}}
              />
              <CartStack.Screen
                name="FinalCart"
                component={FinalCart}
                options={{headerShown: false}}
              />
            </>
          )}
        </>
      )}
    </CartStack.Navigator>
  );
};

export default Cart;
