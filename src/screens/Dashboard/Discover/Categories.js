import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getCategory } from "../../../httpServices/categories";
import { CategoriesActions } from "../../../store/Categories";
import { Styles as styles } from "../../style";
import AnimatedFlatList from "../../../components/FlatList";
import Dropdown from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Search from "../../../components/Search";
import ArtistCard from "../../../components/ArtistCard";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import _, { filter } from "lodash";

const Categories = ({ navigation, route }) => {
  const { categoryName, id } = route?.params;
  const [items, setItems] = useState([
    { key: "1", label: "Local", value: "Local" },
    { key: "2", label: "International", value: "International" },
  ]);
  const [items1, setItems1] = useState([
    { label: "Mainstream", value: "Mainstream" },
    { label: "Alternative", value: "Alternative" },
  ]);
  const [selected, select] = useState({ label: "Local", value: "Local" });
  const [selected1, select1] = useState({
    label: "Mainstream",
    value: "Mainstream",
  });
  const dispatch = useDispatch();
  const { categories, category, selectedArtists } = useSelector(
    (state) => state.Categories
  );
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [name, setName] = useState(
    category && category.name ? category.name : ""
  );
  const { logoutModal, addToBookingModal, authModal } = useSelector(
    (state) => state.UI
  );

  useEffect(() => {
    const fetch = async () => {
      const result = await getCategories();
      dispatch(CategoriesActions.onChangeCategories({ data: result }));
      const categoryResult = await getCategory(
        id ? id : result[0].id,
        category?.artists?.current_page
          ? category?.artists?.current_page + 1
          : 1
      );
      dispatch(CategoriesActions.onChangeCategory({ data: categoryResult }));
      dispatch(
        CategoriesActions.onChangeSelectedArtists({
          data: categoryResult.artists.data,
        })
      );
      route.params.categoryName
        ? setName(categoryName)
        : setName(result[0].name);
    };
    fetch();
  }, [dispatch]);

  useEffect(() => {
    const filtered = _.filter(category.artists.data, (item) => {
      let international = selected.value === "International" ? 1 : 0;
      let mainstream = selected1.value === "Mainstream" ? 1 : 0;
      if (
        item?.international === international &&
        item?.mainstream === mainstream
      )
        return item;
    });
    dispatch(CategoriesActions.onChangeSelectedArtists({ data: filtered }));
  }, [selected, selected1]);

  const onHandleChangeCategory = async (id, name) => {
    setName(name);
    if (category.id !== id) {
      dispatch(CategoriesActions.onChangeCategory({ date: [] }));
      const data = await getCategory(id);
      if (data) {
        dispatch(CategoriesActions.onChangeCategory({ data }));
      }
    }
  };
  return (
    <React.Fragment>
      <ScrollView
        style={
          (logoutModal || addToBookingModal || authModal) && { opacity: 0.5 }
        }
      >
        {categories && categories.length > 0 && (
          <>
            <AnimatedFlatList
              name={name}
              onSetFilter={onHandleChangeCategory}
              data={[
                { id: "left-spacer" },
                ...categories,
                { id: "right-spacer" },
              ]}
            />
            <View style={styles.defaultStyles.container}>
              <View style={styles.defaultStyles.flexContainer}>
                <View style={styles.categories.dropdownContainer}>
                  <Dropdown
                    open={open}
                    value={selected.value}
                    items={items}
                    setOpen={setOpen}
                    setValue={select}
                    setItems={setItems}
                    style={styles.categories.categoryDropdown}
                    textStyle={{ color: "#FF671D" }}
                    arrowIconStyle={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      backgroundColor: "#FF671D",
                    }}
                    dropDownContainerStyle={{
                      marginTop: 5,
                      backgroundColor: "#2D2D2D",
                      borderWidth: 1,
                      borderColor: "#FF671D",
                      borderRadius: 3,
                    }}
                    renderListItem={(props) => (
                      <TouchableOpacity
                        key={props.item.value}
                        style={styles.categories.dropdownListItem}
                        onPress={() => {
                          select(props.item);
                          setOpen(false);
                        }}
                      >
                        <View style={styles.defaultStyles.flexContainer}>
                          <Icon
                            name={
                              selected.value === props.item.value
                                ? "square"
                                : "square-o"
                            }
                            style={styles.categories.dropdownItemIcon}
                          />
                          <Text style={styles.categories.dropdownItem}>
                            {props.item.label}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                <View style={styles.categories.dropdownContainer}>
                  <Dropdown
                    open={open1}
                    value={selected1.value}
                    items={items1}
                    setOpen={setOpen1}
                    setValue={select1}
                    setItems={setItems1}
                    style={styles.categories.categoryDropdown}
                    textStyle={{ color: "#FF671D" }}
                    dropDownContainerStyle={{
                      marginTop: 5,
                      backgroundColor: "#2D2D2D",
                      borderWidth: 1,
                      borderColor: "#FF671D",
                      borderRadius: 5,
                    }}
                    arrowIconStyle={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      backgroundColor: "#FF671D",
                    }}
                    renderListItem={(props) => (
                      <TouchableOpacity
                        onPress={() => {
                          select1(props.item);
                          setOpen1(false);
                        }}
                        key={props.item.value}
                        style={styles.categories.dropdownListItem}
                      >
                        <View style={styles.defaultStyles.flexContainer}>
                          <Icon
                            name={
                              selected1.value === props.item.value
                                ? "square"
                                : "square-o"
                            }
                            style={styles.categories.dropdownItemIcon}
                          />
                          <Text style={styles.categories.dropdownItem}>
                            {props.item.label}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </View>
            <View style={styles.categories.searchContainer}>
              <View style={styles.defaultStyles.container}>
                <Text style={styles.discover.title}>Results for </Text>
                <Search />
              </View>
              {category && category.artists && selectedArtists ? (
                <React.Fragment>
                  {selectedArtists.length >= 0 ? (
                    <FlatList
                      listKey={(item, index) => "D" + index.toString()}
                      numColumns={2}
                      horizontal={false}
                      data={selectedArtists}
                      renderItem={(item) => {
                        return (
                          <ArtistCard
                            navigation={navigation}
                            key={item.index}
                            item={item.item}
                            width={0.43}
                            backgroundColor={"#2D2D2D"}
                            margin={0.01}
                            name={name}
                            onTouchEnd={() =>
                              navigation.navigate("Artist", {
                                id: item.item.id,
                              })
                            }
                          />
                        );
                      }}
                    />
                  ) : (
                    <Text
                      style={{
                        paddingTop: 50,
                        color: "#818181",
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      Search result is 0
                    </Text>
                  )}
                </React.Fragment>
              ) : (
                <Text
                  style={{
                    paddingTop: 50,
                    color: "#818181",
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  Loading...
                </Text>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </React.Fragment>
  );
};
export default Categories;
