import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authentication/authentication.slice';
import searchFiltersReducer from './filters/Filters.slice';


export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    filters: searchFiltersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
