import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBlog, removeBlog, addComment } from "../reducers/blogReducer";
import { useNavigate, useMatch } from "react-router-dom";
import commentService from "../services/comments";

import storage from "../services/storage";

const Blogi = () => {
  const [comment, setComment] = useState("");

  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const commentToAdd = {
      body: comment,
    };
    commentService.create(blog.id, commentToAdd).then((uusiComment) => {
      const comments = blog.comments.concat(uusiComment);
      const changedBlog = {
        ...blog,
        comments: comments,
      };
      dispatch(addComment(changedBlog, comment));
    });
    setComment("");
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

      <div>
        <h4>Comments</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Comment:
              <input
                type="text"
                id="comment"
                value={comment}
                onChange={handleCommentChange}
              />
            </label>
          </div>
          <button id="create-comment-button" type="submit">
            Create Comment
          </button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.body}</li>
          ))}
        </ul>
        <br />
      </div>
    </div>
  );
};

export default Blogi;
