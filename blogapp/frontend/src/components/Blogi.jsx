import { useSelector, useDispatch } from "react-redux";
import { updateBlog, removeBlog } from "../reducers/blogReducer";
import { useNavigate, useMatch } from "react-router-dom";

import storage from "../services/storage";

const Blogi = () => {
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  //console.log("Blogi - blog", blog);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleVote = async (blog) => {
    dispatch(updateBlog(blog));
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog));
      navigate("/");
    }
  };

  if (!blog) {
    return null;
  }

  const nameOfUser = blog.user ? blog.user.name : "anonymous";
  const canRemove = blog.user ? blog.user.username === storage.me() : true;

  return (
    <div style={style} className="blog">
      <h2>
        {blog.title} by {blog.author}
      </h2>

      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button style={{ marginLeft: 3 }} onClick={() => handleVote(blog)}>
          like
        </button>
      </div>

      <div>added by {nameOfUser}</div>
      {canRemove && <button onClick={() => handleDelete(blog)}>remove</button>}
    </div>
  );
};

export default Blogi;
