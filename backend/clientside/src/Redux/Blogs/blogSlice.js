import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    allBlogs: [],
    featuredBlogs: [],
  },
  reducers: {
    setAllBlogs: (state, action) => {
      const blogs = action.payload;

      state.allBlogs = [...blogs];
    },

    setFeaturedBlogs: (state, action) => {
      const selectedBlogs = action.payload;

      console.log(selectedBlogs)
    },
  },
});

export const { setAllBlogs, setFeaturedBlogs } = blogsSlice.actions;

export default blogsSlice.reducer;

export const setAllBlogsFunction = (state) => state.allBlogs;
export const setAllFeaturedBlogs = (state) => state.featuredBlogs;
