import React, { useEffect } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Text,
  View,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getArtist } from "../../../httpServices/artists";
import { ArtistsActions } from "../../../store/Artists";
import { Styles as styles } from "../../style";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import { APIUrl } from "../../../httpServices/http.json";
import { normalize } from "react-native-elements";
import Loading from "../../../components/Loading";

const img =
  "http://entertainme.co/storage/images/artists/ZdZiph9MYZHRhFcx1CXNqvg6pKsPJP1KKTbaAagR.png";
const h = Dimensions.get("screen").height;
const w = Dimensions.get("screen").width;

const Artist = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const { artist } = useSelector((state) => state.Artists);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetch = async () => {
      const result = await getArtist(props.route.params.id);
      if (result) {
        dispatch(ArtistsActions.onChangeArtist({ data: result }));
      }
    };
    fetch();
  }, []);
  if (artist?.id?.length === 0) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <View style={styles.artist.artistCoverPhote}>
        <ImageBackground
          style={styles.artist.artistCoverPhote}
          source={{
            uri: APIUrl + artist.image_url,
          }}
        />
      </View>
      <Animated.FlatList
        key="artist"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollY } } }],
          { useNativeDriver: true }
        )}
        data={[""]}
        renderItem={() => (
          <Animated.View
            style={[
              styles.artist.artistContent,
              {
                transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [0, 1],
                      outputRange: [h * 0.4, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <ScrollView>
              <View
                style={{
                  padding: normalize(w * 0.08),
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: normalize(16),
                  }}
                >
                  About
                </Text>
                <Text style={styles.artist.artistDescription}>
                  {artist.description}
                </Text>
                <View style={styles.artist.artistLike}>
                  <TouchableOpacity style={styles.artist.loveButton}>
                    <IonIcon
                      name="heart-outline"
                      style={{ color: "#FF671D", fontSize: normalize(22) }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.defaultStyles.button}>
                    <IonIcon
                      name="cart-outline"
                      style={styles.discover.artistIcon}
                    />
                    <Text style={{ color: "white" }}>Add To Booking</Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    paddingVertical: normalize(h * 0.01),
                  }}
                >
                  Watch Artist's Videos
                </Text>
                {artist &&
                  artist?.works?.map((item) => {
                    if (item.type === "video" || item.type === "audio")
                      return (
                        <View
                          style={{
                            flexDirection: "row",
                            width: w,
                            marginVertical: normalize(h * 0.01),
                          }}
                        >
                          <Image
                            style={{
                              width: normalize(45),
                              height: normalize(45),
                              borderRadius: 10,
                              backgroundColor: "#6C757D",
                            }}
                            source={{ uri: APIUrl + item.content }}
                          />
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: w * 0.7,
                            }}
                          >
                            <View
                              style={{
                                paddingHorizontal: normalize(w * 0.02),
                                justifyContent: "flex-start",
                              }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: normalize(10),
                                  fontWeight: "bold",
                                }}
                              >
                                {item.location
                                  ? `
                                Playing in ${item.location}
                                `
                                  : `Playing`}
                              </Text>
                              <Text style={{ color: "white", fontSize: 10 }}>
                                Duration in 4 min...
                              </Text>
                            </View>
                            <Icon
                              name="play-circle"
                              color="#FF671D"
                              size={30}
                            />
                          </View>
                        </View>
                      );
                  })}
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    paddingVertical: normalize(h * 0.02),
                  }}
                >
                  Photos of Performances
                </Text>
              </View>
              <FlatList
                horizontal
                key="works images"
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: normalize(w * 0.02) }}
                style={{ marginTop: normalize(-h * 0.03) }}
                data={artist.works}
                renderItem={({ item, index }) => {
                  if (item.type === "image")
                    return (
                      <Image
                        key={item.id}
                        style={styles.artist.workImage}
                        source={{ uri: APIUrl + item.content }}
                      />
                    );
                }}
              />
              <View
                style={{
                  paddingLeft: normalize(w * 0.08),
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    paddingVertical: normalize(h * 0.01),
                  }}
                >
                  Previous events
                </Text>
                <FlatList
                  numColumns={2}
                  key="events"
                  data={artist.events}
                  renderItem={(item, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: "#0D0D0D",
                        justifyContent: "center",
                        alignItems: "center",
                        height: normalize(h * 0.07),
                        width: normalize(w * 0.4),
                        borderRadius: normalize(10),
                        marginRight: normalize(15),
                        padding: normalize(5),
                        marginVertical: normalize(5),
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontWeight: "bold",
                        }}
                        ellipsizeMode="middle"
                      >
                        {item.item.name}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </ScrollView>
          </Animated.View>
        )}
      />
    </React.Fragment>
  );
};

export default Artist;
