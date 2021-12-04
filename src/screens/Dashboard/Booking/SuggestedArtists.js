import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import ArtistCard from "../../../components/ArtistCard";
import { updateReuestOrder } from "../../../httpServices/event";
import { EventsActions } from "../../../store/Events";

const SuggestedArtists = (props) => {
  const dispatch = useDispatch();
  const { featuredArtists } = useSelector((state) => state.Artists);
  const { bookEvent } = useSelector((state) => state.Events);
  const onHandleAddToBooking = async (id) => {
    //redux
    dispatch(
      EventsActions.onHandleBookEventArray({ element: "artist_id", value: id })
    );
    //APi call
    const result = await updateReuestOrder(bookEvent);
    console.log(result);
  };
  return (
    <FlatList
      listKey={(index) => "D" + index.toString()}
      numColumns={2}
      horizontal={false}
      data={featuredArtists}
      renderItem={({ index, item }) => {
        const artist = bookEvent.artist_id.find((obj) => item.id === obj);
        return (
          <ArtistCard
            key={index}
            item={item}
            width={0.43}
            margin={0.01}
            added={artist ? true : false}
            addToBooking={onHandleAddToBooking}
          />
        );
      }}
    />
  );
};

export default SuggestedArtists;
