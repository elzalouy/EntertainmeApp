import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import reducers from "./reducers";

const ArtistsSlice = createSlice({
  name: "Artists",
  initialState,
  reducers: reducers,
});

export const ArtistsActions = ArtistsSlice.actions;
export default ArtistsSlice.reducer;
