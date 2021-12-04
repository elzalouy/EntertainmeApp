import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';
import Favorites from './Favorites';
import Chat from './Chat';
import MyBookings from './MyBookings';
import GoBack from '../../../components/GoBack';
import {Styles as styles} from '../../style';
import EventArtist from './EventArtists';
import {useSelector} from 'react-redux';
const ProfileStack = createStackNavigator();

const ProfileDashboard = props => {
  const {selectedBooking} = useSelector(state => state.User);
  return (
    <ProfileStack.Navigator
      initialRouteName="User"
      screenOptions={{
        headerShadowVisible: false,
        headerShown: true,
        headerStyle: styles.categories.header,
        headerTitleStyle: styles.profile.headerTitle,
        headerTintColor: 'white',
        headerLeftContainerStyle: styles.categories.headerIcon,
      }}>
      <ProfileStack.Screen
        name="User"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="MyBookings"
        component={MyBookings}
        options={{
          title: 'My Bookings',
          headerLeft: () =>
            GoBack({to: 'Profile', navigation: props.navigation, ...props}),
        }}
      />
      <ProfileStack.Screen
        name="EventArtists"
        component={EventArtist}
        options={{
          title: selectedBooking?.event_name
            ? selectedBooking?.event_name
            : 'My Bookings',
          headerLeft: () =>
            GoBack({
              to: 'MyBookings',
              navigation: props.navigation,
              ...props,
            }),
        }}
      />
      <ProfileStack.Screen name="Favorites" component={Favorites} />
      <ProfileStack.Screen name="Chat" component={Chat} />
    </ProfileStack.Navigator>
  );
};

export default ProfileDashboard;
