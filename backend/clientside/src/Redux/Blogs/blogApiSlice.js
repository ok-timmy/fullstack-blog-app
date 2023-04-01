import { apiSlice } from "../../App/api/apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Create New BlogPost
    createBlogPost: builder.mutation({
      query: (blogPostDetails) => ({
        url: "api/blog/create",
        method: "POST",
        body: { ...blogPostDetails },
      }),
    }),

    //Edit BlogPost
    editBlogPost: builder.mutation({
      query: (updatedContent) => ({
        url: "",
        method: "PUT",
        body: { ...updatedContent },
      }),
    }),

    //Delete BlogPost
    deleteBlogPost: builder.mutation({
      query: (postId) => ({
        url: "",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateBlogPostMutation,
  useEditBlogPostMutation,
  useDeleteBlogPostMutation,
} = blogApiSlice;
