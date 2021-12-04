/**
 * onChangeFeaturedArtits()
 *
 *
 * change the state and replace the featured artitis.
 *
 *
 * @param {payload} action Payload to be changed in the state.
 */

export const onChangeFeaturedArtists = (state, action) => {
  state.featuredArtists = action.payload.data;
};
export const onChangeArtist = (state, action) => {
  state.artist = action.payload.data;
};

const exports = {
  onChangeFeaturedArtists,
  onChangeArtist,
};

export default exports;
