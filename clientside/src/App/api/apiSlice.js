import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../../Redux/Auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://timmy-blog-app.onrender.com/",
  credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState()).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
 

  if (result?.error?.originalStatus === 403) {
    //Call for refresh Token
    // console.log("Sending Refresh Token");

    //Send Refresh Token
    const refreshResults = await baseQuery("/api/refresh", api, extraOptions);

    if (refreshResults.data) {
      const user = api.getState().auth.user;

      //Go on to store the new token
      api.dispatch(
        setCredentials({ ...refreshResults.data, user })
      );

      // Retry original token with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
