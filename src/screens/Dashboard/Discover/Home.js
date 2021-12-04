import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Header from '../Header';
import Discover1 from '../../../components/DiscoverSvg';
import Discover2 from '../../../components/EventSvg';
import Search from '../../../components/Search';
import {Discover as styles} from '../../style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import ArtistCard from '../../../components/ArtistCard';
import LinearGradient from 'react-native-linear-gradient';
import {APIUrl} from '../../../httpServices/http.json';
import _ from 'lodash';

const h = Dimensions.get('screen').height;
const w = Dimensions.get('screen').width;

// Artists Section
const Artists = ({navigation, ...props}) => {
  const dispatch = useDispatch();
  const {featuredArtists} = useSelector(state => state.Artists);
  if (featuredArtists && featuredArtists?.length <= 0)
    navigation.navigate('Loading');
  return (
    <React.Fragment>
      <ScrollView
        style={styles.defaultStyles.flexContainer}
        contentContainerStyle={{paddingRight: 10}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {featuredArtists &&
          featuredArtists.map((item, index) => (
            <ArtistCard
              navigation={navigation}
              item={item}
              key={index}
              backgroundColor={'#2D2D2D'}
              onTouchEnd={() => navigation.navigate('Artist', {id: item.id})}
            />
          ))}
      </ScrollView>
    </React.Fragment>
  );
};

// Categories Section
const Categories = props => {
  const {selectedCategories} = useSelector(state => state.Categories);
  if (selectedCategories?.length <= 0) props.navigation.navigate('Loading');
  return (
    <React.Fragment>
      <View style={styles.defaultStyles.flexContainer}>
        <Text style={styles.discover.title}>Categories</Text>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Categories', {
              id: selectedCategories[0].id,
              categoryName: selectedCategories[0].name,
            })
          }>
          <Text style={styles.discover.link}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.defaultStyles.flexContainer}>
        {selectedCategories &&
          selectedCategories.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                props.navigation.navigate('Categories', {
                  id: item.id,
                  categoryName: item.name,
                })
              }>
              <ImageBackground
                style={styles.discover.categoryImageStyle}
                source={{uri: APIUrl + item.image}}>
                <LinearGradient colors={['#FF671D33', '#FF671D33']} />
              </ImageBackground>
              <Text style={styles.discover.categoryTitle}>{item.name}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </React.Fragment>
  );
};

// Discover Screen
const Discover = props => {
  const {logoutModal, addToBookingModal, authModal, cartModal} = useSelector(
    state => state.UI,
  );
  return (
    <View
      style={
        (logoutModal || addToBookingModal || authModal || cartModal) && {
          opacity: 0.5,
        }
      }>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Discover" {...props} />
        <View style={styles.defaultStyles.container}>
          <Text style={styles.defaultStyles.grayText}>
            Search Artists you want to schedule with
          </Text>
          <Search />
          <View style={styles.defaultStyles.flexContainer}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Categories', {
                  categoryName: null,
                  id: null,
                })
              }>
              <View style={styles.discover.card}>
                <Discover1 height={h * 0.12} width={w * 0.28} />
                <Text style={styles.discover.cardTitle}>
                  Start Your Journey
                </Text>
                <Text style={styles.discover.cardDesc}>
                  It is difficult to plan an event...
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Booking')}>
              <View style={styles.discover.card}>
                <Discover2 height={h * 0.133} width={w * 0.28} />
                <Text style={styles.discover.cardTitle}>
                  Let Us Do The Work For You
                </Text>
                <Text style={styles.discover.cardDesc}>
                  Do you have an event you are ...
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Categories {...props} />
          <View style={styles.defaultStyles.flexContainer}>
            <Text style={[styles.discover.title]}>Featured Artists</Text>
          </View>
        </View>
        <Artists {...props} />
      </ScrollView>
    </View>
  );
};

export default Discover;
