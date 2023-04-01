import { apiSlice } from "../../App/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "api/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    signUp: builder.mutation({
      query: (credentials) => ({
        url: "api/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    getUserDetails: builder.query({
      query: (email) => `api/auth/${email}`,
      keepUnusedDataFor: 0
    }),

    updateUserDetails: builder.mutation({
      query: (updatedUserDetails) => ({
        url: `api/auth/${updatedUserDetails.id}`,
        method: "PUT",
        body: { ...updatedUserDetails },
      }),
    }),

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
