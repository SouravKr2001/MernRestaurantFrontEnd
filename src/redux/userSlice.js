import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    image: "",
    firstName: "",
    lastName: "",
    email: "",
    _id: "",
  },
  reducers: {
    loginRedux: (state, action) => {
      console.log(action.payload.data);
      //   state.user = action.payload.data
      state._id = action.payload.data._id;
      state.email = action.payload.data.email;
      state.lastName = action.payload.data.lastName;
      state.firstName = action.payload.data.firstName;
      state.image = action.payload.data.image;
    },

    logoutRedux: (state, action) => {
      state._id = "";
      state.email = "";
      state.lastName = "";
      state.firstName = "";
      state.image = "";
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;
