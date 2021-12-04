import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import reducers from "./reducers";

const FavoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers,
});

export const FavoritesActions = FavoritesSlice.actions;
export default FavoritesSlice.reducer;
