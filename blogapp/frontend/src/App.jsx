import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import storage from "./services/storage";

import Login from "./components/Login";
import Notification from "./components/Notification";

import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Footer from "./components/Footer";

import { poistaUser, setUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";

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

  const user = useSelector(({ user }) => {
    return user;
  });

  const handleLogout = () => {
    dispatch(poistaUser(user));
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {!user ? (
        <Login />
      ) : (
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
      {user ? (
        <div>
          <BlogForm />
          <BlogList />
        </div>
      ) : (
        <div>
          <p>log in...</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
