import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './colorCountReducer';

export const store = configureStore({
  reducer: {
    colors: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
