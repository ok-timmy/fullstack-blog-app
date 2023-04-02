import { apiSlice } from "../../App/api/apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Get all BlogPost
    getAllBlogPost: builder.query({
      query: () => "api/allPost/",
      keepUnusedDataFor: 5,
    }),

    //Create New BlogPost
    createBlogPost: builder.mutation({
      query: (blogPostDetails) => ({
        url: "api/blogPost/create",
        method: "POST",
        body: { ...blogPostDetails },
      }),
    }),

    //Get Specific Post
    getSpecificPost: builder.query({
      query: (postId) => `api/allPost/specificPost/${postId}`,
      keepUnusedDataFor: 5,
    }),

    //Edit BlogPost
    editBlogPost: builder.mutation({
      query: (updatedContent, postId) => ({
        url: `api/blogPost/update/${postId}`,
        method: "PUT",
        body: { ...updatedContent },
      }),
    }),

    //EditBlogPostLikes
    editBlogPostLikes: builder.mutation({
      query: (postId) => ({
        url: `api/blogPost/updateLikes/${postId}`,
        method: "PATCH",
      }),
    }),

    //Delete BlogPost
    deleteBlogPost: builder.mutation({
      query: (postId) => ({
        url: `api/blogPost/deletePost/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateBlogPostMutation,
  useEditBlogPostMutation,
  useDeleteBlogPostMutation,
  useGetAllBlogPostQuery,
  useEditBlogPostLikesMutation,
} = blogApiSlice;
