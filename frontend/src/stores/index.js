import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chat';
export default configureStore({
  reducer: {
    chat: chatReducer,
  }
});