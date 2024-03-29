import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      _id: null,
      email: null,
      userName: null,
      firstName: null,
      secondName: null,
      image: null,
    },

    token: null,
  },

  reducers: {
    setCredentials: (state, action) => {
      const { _id ,email, image, userName, firstName, secondName, accessToken } =
        action.payload;

      const newState = {
        _id,
        email,
        image,
        userName,
        firstName,
        secondName,
      };

      state.user = { ...newState };
      state.token = accessToken;
    },

    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const setCurrentUser = (state) => state.auth.user;
export const setCurrentToken = (state) => state.auth.token;
