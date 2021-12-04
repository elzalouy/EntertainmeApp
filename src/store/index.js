import { configureStore } from "@reduxjs/toolkit";
import UiSlice from "./Ui";
import ArtistsSlice from "./Artists";
import CategoriesSlice from "./Categories";
import UserSlice from "./User";
import EventsSlice from "./Events";
import Favorites from "./Favorites";

const store = configureStore({
  reducer: {
    UI: UiSlice,
    Artists: ArtistsSlice,
    Categories: CategoriesSlice,
    User: UserSlice,
    Events: EventsSlice,
    Favorites: Favorites,
  },
});

export default store;
