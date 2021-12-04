import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {BackHandler, StatusBar, View} from 'react-native';
import Auth from './Auth';
import Laoding from '../components/Loading';
import Dashboard from './Dashboard';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {UiActions} from '../store/Ui';
import {getItem, removeItem} from '../utils/StorageHandler';
import {getCategories} from '../httpServices/categories';
import {
  getArtist,
  getArtists,
  getFeaturedArtists,
} from '../httpServices/artists';
import {ArtistsActions} from '../store/Artists';
import {CategoriesActions} from '../store/Categories';
import _, {result} from 'lodash';
import {getEventsByUser} from '../httpServices/event';
import {EventsActions} from '../store/Events';
import Settings from './Settings';
import {SwitchRouter} from 'react-navigation';
import {getFavourites} from '../httpServices/favourites';
import {FavoritesActions} from '../store/Favorites';
import LogoutModal from '../components/LogoutModal';
import AuthRequiredModal from '../components/AuthRequiredModal';
import AddToBooking from '../components/addToBooking';
import SearchModal from '../components/SearchModal';
import RequestSendModal from '../components/RequestSentModal';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
  },
};

const RootStack = createStackNavigator();

const AppStack = props => {
  const dispatch = useDispatch();
  const {
    logged,
    loading,
    skip,
    authModal,
    addToBookingModal,
    searchModal,
    logoutModal,
    requestModal,
  } = useSelector(state => state.UI);
  useEffect(() => {
    const fetch = async () => {
      let Artistsresult,
        categoriesResult,
        selected,
        token,
        bookings,
        selectedBookingArtists,
        favourites;
      // get featured artists
      Artistsresult = await getFeaturedArtists();
      dispatch(ArtistsActions.onChangeFeaturedArtists({data: Artistsresult}));
      // get categories
      categoriesResult = await getCategories();
      dispatch(CategoriesActions.onChangeCategories({data: categoriesResult}));
      //set selected categories for discover screen
      selected = _.take(categoriesResult, 4);
      dispatch(CategoriesActions.onChangeSelectedCategories({data: selected}));
      // check if the user is logged in
      token = await getItem('x-auth-token');
      dispatch(
        UiActions.onHandleUiChange([
          {element: 'loading', value: false},
          {element: 'logged', value: token ? true : false},
        ]),
      );
      if (logged) {
        // Set Selected Booking by default and Get User Bookings
        bookings = await getEventsByUser();
        if (bookings.data) {
          dispatch(
            EventsActions.onChangeUserItems([
              {element: 'userBookings', data: bookings.data},
            ]),
          );
        }
        favourites = await getFavourites();
        dispatch(FavoritesActions.changeFavourites(favourites.data));
      }
    };
    setTimeout(() => {
      fetch();
    }, 2000);
  }, [logged]);
  return (
    <React.Fragment>
      <StatusBar
        hidden={true}
        barStyle="light-content"
        backgroundColor="black"
      />
      {logoutModal && <LogoutModal />}
      {!logged && authModal && <AuthRequiredModal />}
      {requestModal && <RequestSendModal />}
      <NavigationContainer theme={theme}>
        <RootStack.Navigator
          initialRouteName="Loading"
          screenOptions={{headerShown: false}}>
          {loading && <RootStack.Screen name="Loading" component={Laoding} />}
          {!logged && !skip ? (
            <RootStack.Screen name="Auth" component={Auth} />
          ) : (
            <>
              <RootStack.Screen name="AppDashboard" component={Dashboard} />
              <RootStack.Screen name="Settings" component={Settings} />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
};

export default AppStack;
