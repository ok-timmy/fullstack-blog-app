import { apiSlice } from "../../App/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login to your account
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "api/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    
    //Register A New User
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "api/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    //Get User Details
    getUserDetails: builder.query({
      query: (email) => `api/auth/${email}`,
      keepUnusedDataFor: 0
    }),

    //Update a User Details
    updateUserDetails: builder.mutation({
      query: (updatedUserDetails) => ({
        url: `api/auth/${updatedUserDetails.id}`,
        method: "PUT",
        body: { ...updatedUserDetails },
      }),
    }),

    //Log out of the app
    signOut: builder.mutation({
      query: () => ({
        url: "api/logout",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
} = authApiSlice;
