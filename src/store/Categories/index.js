import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import reducers from "./reducers";

const CategoriesSlice = createSlice({
  name: "Categories",
  initialState,
  reducers: reducers,
});

export const CategoriesActions = CategoriesSlice.actions;
export default CategoriesSlice.reducer;