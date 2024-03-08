import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

import { setNotification } from "../reducers/notificationReducer";

let message = "";
let type = "success";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addVoteOf(state, action) {
      //console.log(JSON.parse(JSON.stringify(state)));

      // varulta, jos tulee tyhjää jostain syystä...
      if (action.payload) {
        const id = action.payload.id;
        const blogToChange = state.find((n) => n.id === id);
        const changedBlog = {
          ...blogToChange,
          likes: action.payload.likes,
        };
        const blogs = state.map((blog) =>
          blog.id !== id ? blog : changedBlog
        );
        return blogs.sort((a, b) => b.likes - a.likes);
      }
      return state;
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
    try {
      const newBlog = await blogService.create(content);

      message = `Blog created: ${newBlog.title}, ${newBlog.author}`;
      type = "success";
      dispatch(setNotification({ message, type }, 5));

      dispatch(appendBlog(newBlog));
    } catch (error) {
      console.log("error", error);
      message = error.message;
      type = "error";
      dispatch(setNotification({ message, type }, 5));
    }
  };
};

export const updateBlog = (blog) => {
  const id = blog.id;
  const changedBlog = {
    ...blog,
    likes: blog.likes + 1,
  };

  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(id, changedBlog);

      message = `You liked ${updatedBlog.title} by ${updatedBlog.author}`;
      type = "success";
      dispatch(setNotification({ message, type }, 5));

      dispatch(addVoteOf(updatedBlog));
    } catch (error) {
      message = "Joku muu on poistanut blogin...";
      type = "error";
      dispatch(setNotification({ message, type }, 5));
    }
  };
};

export const removeBlog = (blog) => {
  const id = blog.id;

  return async (dispatch) => {
    try {
      await blogService.remove(id);

      message = `Blog ${blog.title}, by ${blog.author} removed`;
      type = "success";
      dispatch(setNotification({ message, type }, 5));

      dispatch(deleteBlog(blog));
    } catch (error) {
      console.log("error", error);
      message = error.message;
      type = "error";
      dispatch(setNotification({ message, type }, 5));
    }
  };
};

export const { addVoteOf, appendBlog, deleteBlog, setBlogs } =
  blogSlice.actions;

export default blogSlice.reducer;
