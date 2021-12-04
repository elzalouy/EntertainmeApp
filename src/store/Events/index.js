import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import reducers from "./reducers";

const EventsSlice = createSlice({
  name: "Events",
  initialState,
   reducers,
});

export const EventsActions = EventsSlice.actions;
export default EventsSlice.reducer;
