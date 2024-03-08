import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import { updateBlog, removeBlog } from "../reducers/blogReducer";

const BlogList = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  const handleVote = async (blog) => {
    dispatch(updateBlog(blog));
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog));
    }
  };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default BlogList;
