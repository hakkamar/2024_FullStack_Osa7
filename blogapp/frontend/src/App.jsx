import { useEffect, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import storage from "./services/storage";

import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Footer from "./components/Footer";

import { haeJaAsetaUser, poistaUser, setUser } from "./reducers/userReducer";
import {
  initializeBlogs,
  createBlog,
  updateBlog,
  removeBlog,
} from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const blogFormRef = createRef();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector(({ user }) => {
    return user;
  });

  const handleLogin = (credentials) => {
    dispatch(haeJaAsetaUser(credentials));
  };

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog));
    blogFormRef.current.toggleVisibility();
  };

  const handleVote = async (blog) => {
    dispatch(updateBlog(blog));
  };

  const handleLogout = () => {
    dispatch(poistaUser(user));
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog));
    }
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      ))}
      <Footer />
    </div>
  );
};

export default App;
