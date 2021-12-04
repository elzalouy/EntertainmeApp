import React, {useEffect, useState} from 'react';
import {
  Modal,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Styles} from '../screens/style';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {UiActions} from '../store/Ui';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ArtistCard from './ArtistCard';
import {getItem, removeItem, setItem} from '../utils/StorageHandler';
import {search} from '../httpServices/categories';
import _ from 'lodash';
const SearchModal = props => {
  const dispatch = useDispatch();
  const {searchModal, searchValue, searchResult} = useSelector(
    state => state.UI,
  );
  const {featuredArtists} = useSelector(state => state.Artists);
  const {categories} = useSelector(state => state.Categories);
  const [searchVals, setSearch] = useState([]);
  const [endEdit, setEndEdit] = useState(false);
  useEffect(() => {
    let fetch = async () => {
      let result = await getItem('search');
      setSearch(JSON.parse(result));
      dispatch(
        UiActions.onHandleUiChange([
          {element: 'searchValue', value: ''},
          {element: ' searchResult', value: {}},
          {element: 'searchVisible', value: true},
        ]),
      );
    };
    fetch();
  }, []);
  useEffect(() => {
    const onHandleSearch = async () => {
      if (searchValue.length === 0)
        dispatch(
          UiActions.onHandleUiChange([{element: 'searchResult', value: {}}]),
        );
      if (searchValue.length > 0) {
        const result = await search(searchValue);
        dispatch(
          UiActions.onHandleUiChange([
            {element: 'searchResult', value: result},
          ]),
        );
      }
    };
    onHandleSearch();
  }, [endEdit]);
  const onSetVisible = val => {
    dispatch(
      UiActions.onHandleUiChange([
        {element: 'searchValue', value: ''},
        {element: ' searchResult', value: {}},
        {element: 'searchModal', value: val},
      ]),
    );
    setSearch([]);
  };
  const onHandleChange = async text => {
    dispatch(
      UiActions.onHandleUiChange([{element: 'searchValue', value: text}]),
    );
  };
  const onAddToHistory = async () => {
    let result = await getItem('search');
    result = [...JSON.parse(result)];
    if (result.indexOf(searchValue) < 0 && searchValue.length !== 0) {
      result = [...result, searchValue];
      result = await setItem({
        key: 'search',
        value: JSON.stringify(result),
      });
      result = await getItem('search');
      setSearch(JSON.parse(result));
    }
  };
  const onClearHistory = async () => {
    let result = await getItem('search');
    if (result) {
      result = [];
      setItem({key: 'search', value: JSON.stringify(result)});
      setSearch([]);
    }
  };
  const onRemoveFromHistory = async index => {
    let result = await getItem('search');
    result = JSON.parse(result);
    result = _.filter(result, (item, i) => i !== index);
    setItem({key: 'search', value: JSON.stringify(result)});
    setSearch(result);
  };
  const onHandleSelectSearch = async index => {
    let val = searchVals[index];
    onHandleChange(val);
    setEndEdit(!endEdit);
  };
  return (
    <Modal visible={searchModal} animationType="slide" transparent={true}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ScrollView style={Styles.discover.searchModal}>
          <View style={Styles.discover.searchBody}>
            <View style={Styles.discover.searchHeader}>
              <AntIcon
                name="arrowleft"
                color="white"
                size={18}
                onPress={() => onSetVisible(false)}
              />
              <Text style={Styles.discover.searchHeaderTitle}>Search</Text>
            </View>
            <View style={Styles.defaultStyles.flexContainer}>
              <Icon name="search1" style={Styles.discover.searchIcon} />
              <TextInput
                value={searchValue}
                accessible={false}
                style={[Styles.discover.searchInput]}
                onChange={({nativeEvent}) => onHandleChange(nativeEvent.text)}
                onEndEditing={() => {
                  onAddToHistory();
                  setEndEdit(!endEdit);
                }}
              />
            </View>
            <Text style={{color: '#FF671D'}}>
              {(searchResult?.artists?.length <= 0 ||
                searchResult?.categories?.length <= 0) &&
                'Search Not Found'}
            </Text>
            {searchVals?.length > 0 && (
              <View style={Styles.discover.searchSuggestion}>
                <Text style={Styles.discover.title}>Search History</Text>
                <TouchableOpacity onPress={() => onClearHistory()}>
                  <Text style={{color: '#FF671D', fontSize: 12}}>
                    Clear all
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {searchVals?.map((item, index) => {
              if (
                index === searchVals.length - 1 ||
                index === searchVals.length - 2
              )
                return (
                  <View key={index} style={Styles.discover.searchSuggestion}>
                    <TouchableOpacity
                      key={index}
                      onPress={() => onHandleSelectSearch(index)}>
                      <Text style={Styles.discover.searchSuggestionText}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                    <MaterialIcon
                      onPress={() => onRemoveFromHistory(index)}
                      name="close"
                      color="#C8C9CF"
                      size={20}
                      color="#7F8E9D"
                    />
                  </View>
                );
            })}
            <View style={Styles.discover.searchSuggestion}>
              <Text style={Styles.discover.title}>
                {searchValue.length === 0 &&
                (searchResult?.artists?.length <= 0 ||
                  searchResult?.categories?.length) <= 0
                  ? 'Choose Category'
                  : 'Result of Categories'}
              </Text>
            </View>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={Styles.discover.searchCategoryList}>
            {searchResult?.categories?.length > 0 ? (
              searchResult.categories.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      Styles.discover.searchCategory,
                      index === categories.length - 1 && {marginRight: 50},
                    ]}>
                    <Text style={Styles.discover.searchCategoryText}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <>
                {categories &&
                  categories?.length > 0 &&
                  categories?.map((item, index) => (
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('Categories', {
                          id: item.id,
                          categoryName: item.name,
                        })
                      }
                      key={index}
                      style={[
                        Styles.discover.searchCategory,
                        index === categories.length - 1 && {marginRight: 50},
                      ]}>
                      <Text style={Styles.discover.searchCategoryText}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </>
            )}
          </ScrollView>
          <View style={Styles.discover.searchBody}>
            <View style={Styles.discover.searchSuggestion}>
              <Text style={Styles.discover.title}>
                {searchResult?.artists?.length <= 0 ||
                searchResult?.categories?.length <= 0
                  ? 'Most Popular'
                  : 'Results of Artists'}
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={Styles.discover.searchArtists}>
            {searchResult?.artists?.length > 0 ? (
              searchResult?.artists?.map((item, index) => {
                return (
                  <ArtistCard
                    onTouchEnd={() =>
                      props.navigation.navigate('Artist', {id: item.id})
                    }
                    key={index}
                    backgroundColor={'#0D0D0D'}
                    width={0.55}
                    item={item}
                  />
                );
              })
            ) : (
              <>
                {featuredArtists &&
                  featuredArtists.map((item, index) => (
                    <ArtistCard
                      key={index}
                      backgroundColor={'#0D0D0D'}
                      width={0.55}
                      item={item}
                      onTouchEnd={() => {
                        onSetVisible(false);
                        props.navigation.navigate('Artist', {id: item.id});
                      }}
                    />
                  ))}
              </>
            )}
          </ScrollView>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SearchModal;
