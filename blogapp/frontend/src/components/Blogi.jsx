import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBlog, removeBlog, addComment } from "../reducers/blogReducer";
import { useNavigate, useMatch } from "react-router-dom";
import commentService from "../services/comments";

import storage from "../services/storage";

import { Title3, Form, Button, Input, Lista } from "../tyylit";

const Blogi = () => {
  const [comment, setComment] = useState("");

  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

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
    <Lista className="blog">
      <Title3>
        {blog.title} by {blog.author}
      </Title3>

      <div>
        Linkki: <a href={blog.url}> {blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <Button onClick={() => handleVote(blog)}>like</Button>
      </div>

      <div>added by {nameOfUser}</div>
      {canRemove && <Button onClick={() => handleDelete(blog)}>remove</Button>}

      <div>
        <Title3>Comments</Title3>
        <Form onSubmit={handleSubmit}>
          <label>
            Comment:
            <Input
              type="text"
              id="comment"
              value={comment}
              onChange={handleCommentChange}
            />
          </label>
          <Button id="create-comment-button" type="submit">
            Create New Comment
          </Button>
        </Form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.body}</li>
          ))}
        </ul>
        <br />
      </div>
    </Lista>
  );
};

export default Blogi;
