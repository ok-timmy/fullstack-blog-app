import { apiSlice } from "../../App/api/apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Get all BlogPost
    getAllBlogPost: builder.query({
      query: () => "api/allPost/all",
      keepUnusedDataFor: 5,
    }),

    //Get LoggedIn User Blogpost only
    getLoggedInUserBlogPosts: builder.query({
      query: (userEmail) => `api/blogPost/user/${userEmail}`,
      keepUnusedDataFor: 5,
    }),
    //Get single blogpost content
    getSingleBlogPostContent: builder.query({
      query: (id) => `api/allPost/specificPost/${id}`,
      keepUnusedDataFor: 10,
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
      query: (details) => ({
        url: `api/blogPost/updateLikes/${details.postId}`,
        method: "PATCH",
        body: { ...details },
      }),
    }),

    //Comment on BlogPost
    commentOnBlogPost: builder.mutation({
      query: (comment) => ({
        url: `api/blogPost/comment/${comment.postId}`,
        method: "PUT",
        body: { ...comment },
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
  useGetLoggedInUserBlogPostsQuery,
  useEditBlogPostMutation,
  useDeleteBlogPostMutation,
  useGetAllBlogPostQuery,
  useGetSingleBlogPostContentQuery,
  useEditBlogPostLikesMutation,
  useCommentOnBlogPostMutation
} = blogApiSlice;
