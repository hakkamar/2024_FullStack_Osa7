import { useState } from "react";

const NewBlog = ({ doCreate }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doCreate({ title, url, author });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input
              type="text"
              id="url"
              value={url}
              onChange={handleUrlChange}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              type="text"
              id="author"
              value={author}
              onChange={handleAuthorChange}
            />
          </label>
        </div>
        <button id="create-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
