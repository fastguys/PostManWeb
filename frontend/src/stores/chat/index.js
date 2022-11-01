import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    image: "a",
  },
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { setImage } = chatSlice.actions;

export default chatSlice.reducer;
