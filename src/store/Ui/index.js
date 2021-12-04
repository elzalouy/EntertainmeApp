import { createSlice } from "@reduxjs/toolkit";
import initialState from './initialState';
import reducers from './reducers';
const UiSlice=createSlice({
    name:'UIs',
    initialState,
    reducers:reducers
});
export const UiActions=UiSlice.actions;
export default UiSlice.reducer;