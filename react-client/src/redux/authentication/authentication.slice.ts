import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Authentication, AuthenticationState, initialAuthenticationState } from './authentication.types';

const authenticationSlice = createSlice({
  name: 'auth',
  initialState: initialAuthenticationState,
  reducers: {
    setUserAuthentication: (state: AuthenticationState, action: PayloadAction<Authentication>) => {
      state.authentication = action.payload;
    },
    logoutUser: (state: AuthenticationState) => {
      state.authentication = initialAuthenticationState.authentication;
    }
  }
});

export const { setUserAuthentication, logoutUser } = authenticationSlice.actions;
export default authenticationSlice.reducer;
