import React, {useEffect} from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {Styles} from '../../style';
import {APIUrl} from '../../../httpServices/http.json';
import {getArtists} from '../../../httpServices/artists';
import _ from 'lodash';
import {FavoritesActions} from '../../../store/Favorites';
import ArtistCard from '../../../components/ArtistCard';
const Favourites = props => {
  const dispatch = useDispatch();
  const {
    favourites,
    likedArtists,
    likedArtistsCategories,
    selectedCategory,
    selectedLikedArtists,
  } = useSelector(state => state.Favorites);
  const {categories} = useSelector(state => state.Categories);
  useEffect(() => {
    let fetch = async () => {
      let artists = [],
        categories_ids = [],
        categs = [],
        selectedArtists = [];
      favourites.forEach(element => {
        artists.push(element.artist_id);
      });
      let result = await getArtists(artists);
      artists = result?.data;
      artists?.forEach(element => {
        categories_ids.push(element.category_id);
      });
      categories_ids = _.uniqBy(categories_ids, item => item);
      categories_ids.forEach(element => {
        let item = categories.find(item => item.id === element);
        categs.push(item);
      });
      selectedArtists = artists?.filter(
        item => item.category_id === selectedCategory.id,
      );
      dispatch(
        FavoritesActions.onHandleChangeFavourites([
          {element: 'likedArtists', data: artists},
          {element: 'likedArtistsCategories', data: categs},
          {element: 'selectedCategory', data: categs[0]},
          {element: 'selectedLikedArtists', data: selectedArtists},
        ]),
      );
    };
    fetch();
  }, []);
  const onSelectCategory = item => {
    let artists = likedArtists?.filter(
      artist => artist.category_id === item.id,
    );
    // console.log(artists);
    dispatch(
      FavoritesActions.onHandleChangeFavourites([
        {element: 'selectedCategory', data: item},
        {element: 'selectedLikedArtists', data: artists},
      ]),
    );
  };
  return (
    <ScrollView>
      <View style={Styles.defaultStyles.mainContainer}>
        <View style={Styles.defaultStyles.bottomContainer}>
          <Text style={Styles.artist.artistDescription}>
            History of Bookings
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={Styles.defaultStyles.flexContainer}>
          {likedArtistsCategories &&
            likedArtistsCategories.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onSelectCategory(item)}>
                <ImageBackground
                  style={Styles.discover.categoryImageStyle}
                  source={{uri: APIUrl + item.image}}>
                  <LinearGradient colors={['#FF671D33', '#FF671D33']} />
                </ImageBackground>
                <Text
                  style={
                    selectedCategory.id === item.id
                      ? Styles.discover.selectedCategoryTitle
                      : Styles.discover.categoryTitle
                  }>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
        <View style={Styles.defaultStyles.verticalContainer}>
          <Text style={Styles.artist.artistDescription}>
            Favorite {selectedCategory?.name}
          </Text>
        </View>
        <FlatList
          listKey={(item, index) => 'D' + index.toString()}
          numColumns={2}
          horizontal={false}
          data={selectedLikedArtists}
          renderItem={item => {
            return (
              <ArtistCard
                navigation={props.navigation}
                key={item.index}
                item={item.item}
                width={0.4}
                backgroundColor={'#2D2D2D'}
                margin={0.005}
                padding={5}
                onTouchEnd={() =>
                  props.navigation.navigate('Artist', {
                    id: item.item.id,
                  })
                }
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Favourites;
