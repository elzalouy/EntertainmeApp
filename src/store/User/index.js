import {createSlice} from '@reduxjs/toolkit';
import initialState from './initialState';
import reducers from './reducers';

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: reducers,
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
