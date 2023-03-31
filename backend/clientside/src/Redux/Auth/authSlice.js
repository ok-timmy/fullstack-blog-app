import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userName: null,
    image: null,
    token: null,
  },

  reducers: {
    setCredentials: (state, action) => {
      const {
        email,
        // image,
        userName,
        accessToken,
      } = action.payload;

      state.user = email;
      state.userName = userName; 
      // state.image = image;
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
export const setCurrentUserName = (state) => state.auth.userName;
// export const setCurrentUserImage = (state) => state.auth.image;
export const setCurrentToken = (state) => state.auth.token;
