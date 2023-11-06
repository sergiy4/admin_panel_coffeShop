import { PayloadAction, createSlice, isAction } from '@reduxjs/toolkit';
import { UserInfo, AuthInitialState } from '../types';
import { RootState } from '../../../app/store';
const initialState: AuthInitialState = {
  token: null,
  userID: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      const { accessToken, userID } = action.payload;
      state.token = accessToken;
      state.userID = userID;
    },
    Logout: (state) => {
      state.token = null;
      state.userID = null;
    },
  },
});

export const { setCredentials, Logout } = authSlice.actions;
export default authSlice.reducer;
export const SelectToken = (state: RootState) => state.auth.token;
export const SelectUserID = (state: RootState) => state.auth.userID;
