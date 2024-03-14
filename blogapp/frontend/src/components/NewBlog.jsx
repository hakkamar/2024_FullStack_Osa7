import { useState } from "react";
import PropTypes from "prop-types";

import { Title3, Form, Button, Input, Lista } from "../tyylit";

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
    <Lista>
      <Title3>Create a New Blog</Title3>
      <Form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <Input
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
            <Input
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
            <Input
              type="text"
              id="author"
              value={author}
              onChange={handleAuthorChange}
            />
          </label>
        </div>
        <Button id="create-button" type="submit">
          Create
        </Button>
      </Form>
    </Lista>
  );
};

NewBlog.propTypes = {
  doCreate: PropTypes.func.isRequired,
};

export default NewBlog;
