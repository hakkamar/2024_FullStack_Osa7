import { createRef } from "react";
import { useDispatch } from "react-redux";

import Togglable from "./Togglable";
import NewBlog from "./NewBlog";

import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const blogFormRef = createRef();
  const dispatch = useDispatch();

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog));
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
    </div>
  );
};

export default BlogForm;
