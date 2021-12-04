import React, { Fragment, useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Styles } from "../screens/style";
import _, { filter, remove } from "lodash";
const w = Dimensions.get("screen").width;

const AddToBookingNames = ({ onChangeCartEvent, navigation }) => {
  const dispatch = useDispatch();
  const { userBookings, currentBooking } = useSelector((state) => state.Events);
  let [EventsNames, setNames] = useState([]);
  useEffect(() => {
    let Names = _.flatMap(userBookings, (item) => {
      return {
        name: item.event_name,
        id: item.id,
      };
    });
    setNames(Names);
  }, [userBookings]);
  return (
    <>
      {EventsNames.length > 0 && (
        <View style={Styles.discover.addToBookingNames}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {EventsNames?.map((item) => {
              return (
                <Fragment key={item.id}>
                  <TouchableOpacity
                    onPress={() => onChangeCartEvent(item.id)}
                    style={item?.name?.length < 12 && { width: w * 0.3 }}
                  >
                    <Text
                      key={item.id}
                      style={
                        currentBooking?.event_ids?.findIndex(
                          (id) => item.id === id
                        ) < 0
                          ? Styles.profile.recentEventName
                          : [
                              Styles.profile.recentEventName,
                              Styles.profile.selectedRecentEventName,
                            ]
                      }
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </Fragment>
              );
            })}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default AddToBookingNames;
