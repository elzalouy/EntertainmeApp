export const onChangeCategories = (state, action) => {
  state.categories = action.payload.data;
};

export const onChangeCategory = (state, action) => {
  state.category = action.payload.data;
};
export const onChangeSelectedCategories = (state, action) => {
  state.selectedCategories = action.payload.data;
};
export const onChangeSelectedArtists = (state, action) => {
  state.selectedArtists = action.payload.data;
};
const exports = {
  onChangeCategories,
  onChangeCategory,
  onChangeSelectedCategories,
  onChangeSelectedArtists,
};

export default exports;
