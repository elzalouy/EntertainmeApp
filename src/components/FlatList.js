import React from "react";
import {
  Animated,
  ImageBackground,
  StatusBar,
  View,
  Dimensions,
  Text,
} from "react-native";
import { normalize } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { Styles as styles } from "../screens/style";

const w = Dimensions.get("screen").width;
const h = Dimensions.get("screen").height;
const itemSize = w * 0.6;
const spacing = 5;
const spacerItemSize = (w - itemSize) / 2;

const AnimatedFlatList = ({ data, onSetFilter, name }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <React.Fragment>
      <StatusBar hidden />
      <Animated.FlatList
        listKey={(item, index) => "D" + index.toString()}
        data={data}
        horizontal
        key="categories"
        pagingEnabled
        snapToInterval={itemSize}
        decelerationRate={0}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ index, item }) => {
          const inputRange = [
            (index - 2) * itemSize,
            (index - 1) * itemSize,
            index * itemSize,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -40, 0],
          });
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-80, 0, 80],
          });
          const rotateX = scrollX.interpolate({
            inputRange,
            outputRange: ["80deg", "0deg", "-80deg"],
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
          });
          if (!item.name)
            return (
              <View
                style={{
                  width: spacerItemSize,
                  height: normalize(h * 0.3),
                }}
              />
            );
          return (
            <View
              key={item.id}
              style={{
                width: itemSize,
                marginTop: normalize(w * 0.1),
                padding: spacing,
              }}
            >
              <Animated.View
                style={{
                  height: normalize(h * 0.25),
                  marginVertical: normalize(h * 0.05),
                  transform: [
                    { translateX },
                    { translateY },
                    { scale },
                    { rotateY: rotateX },
                  ],
                }}
              >
                <TouchableOpacity
                  onPress={() => onSetFilter(item.id, item.name)}
                  style={styles.categories.CategoryImage}
                >
                  <ImageBackground source={{ uri: item.image }}>
                    <LinearGradient
                      colors={["transparent", "transparent", "#FF671D"]}
                      style={styles.categories.CategoryImageGrediant}
                    />
                  </ImageBackground>
                </TouchableOpacity>
                <Text style={styles.categories.categoryTitle}>{item.name}</Text>
              </Animated.View>
            </View>
          );
        }}
      />
    </React.Fragment>
  );
};
export default AnimatedFlatList;
