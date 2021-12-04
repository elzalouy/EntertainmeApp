import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Discover as styles } from "../screens/style";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../store/Ui";
import SearchModal from "./SearchModal";

const Search = ({ type }) => {
  const dispatch = useDispatch();
  const onHandlePress = () => {
    dispatch(
      UiActions.onHandleUiChange([
        { element: "searchValue", value: "" },
        { element: " searchResult", value: {} },
        { element: "searchModal", value: true },
      ])
    );
  };
  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => onHandlePress()}
        style={styles.defaultStyles.flexContainer}
      >
        <Icon name="search1" style={styles.discover.searchIcon} />
        <View accessible={false} style={styles.discover.searchInput} />
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default Search;
