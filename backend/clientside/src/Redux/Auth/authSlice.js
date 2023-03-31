import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      email: null,
      userName: null,
      image: null,
    },

    token: null,
  },

  reducers: {
    setCredentials: (state, action) => {
      const { email, image, userName, accessToken } = action.payload;

      const newState = {
        email,
        image,
        userName,
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
