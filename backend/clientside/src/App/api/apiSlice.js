import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../../Redux/Auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
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
  //Console log the response here
  console.log(result.data, "This is the result Data");

  if (result?.error?.originalStatus === 403) {
    //Call for refresh Token
    console.log("Sending Refresh Token");

    //Send Refresh Token
    const refreshResults = await baseQuery("/api/refresh", api, extraOptions);
    console.log("Refresh Result:", refreshResults);

    if (refreshResults.data) {
      const user = api.getState().auth.user;
      console.log("We called refresh and got this back", user);

      //Go on to store the new token
      api.dispatch(
        setCredentials({ ...refreshResults.data, user })
      );

      // Retry original token with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("The code dey reach here");
      api.dispatch(logOut());
    }
  }
  // console.log(result);
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
