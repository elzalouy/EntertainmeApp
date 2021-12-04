export const setFavorite = (state, action) => {
  let favs = [...state.favourites];
  let index = favs.findIndex(
    item => item.artist_id === action.payload.artist_id,
  );
  if (index < 0) {
    favs.push(action.payload);
    state.favourites = favs;
  }
};
export const setFavorites = (state, action) => {
  state.favourites = [...state.favourites, ...action.payload];
};
export const changeFavourites = (state, action) => {
  state.favourites = action.payload;
};
export const removeFavourite = (state, action) => {
  let favourites = [...state.favourites];
  favourites = favourites.filter(item => item.artist_id !== action.payload);
  state.favourites = favourites;
};
export const onHandleChangeFavourites = (state, action) => {
  action.payload.forEach(item => {
    state[item.element] = item.data;
  });
};
const exports = {
  setFavorite,
  setFavorites,
  changeFavourites,
  removeFavourite,
  onHandleChangeFavourites,
};
export default exports;
