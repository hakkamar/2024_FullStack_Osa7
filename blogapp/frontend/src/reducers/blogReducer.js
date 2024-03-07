import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addVoteOf(state, action) {
      //console.log(JSON.parse(JSON.stringify(state)));
      const id = action.payload.id;
      const blogToChange = state.find((n) => n.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: action.payload.likes,
      };
      const blogs = state.map((blog) => (blog.id !== id ? blog : changedBlog));
      return blogs.sort((a, b) => b.likes - a.likes);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    deleteBlog(state, action) {
      const remainingBlogs = state.filter(
        (blog) => blog.id !== action.payload.id
      );
      return remainingBlogs;
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const updateBlog = (blog) => {
  const id = blog.id;
  const changedBlog = {
    ...blog,
    likes: blog.likes + 1,
  };
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, changedBlog);
    dispatch(addVoteOf(updatedBlog));
  };
};

export const removeBlog = (blog) => {
  const id = blog.id;

  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(deleteBlog(blog));
  };
};

export const { addVoteOf, appendBlog, deleteBlog, setBlogs } =
  blogSlice.actions;

export default blogSlice.reducer;
