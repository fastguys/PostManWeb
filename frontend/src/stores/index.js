import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chat';

export default configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  }),
  reducer: {
    chat: chatReducer,
  }
});