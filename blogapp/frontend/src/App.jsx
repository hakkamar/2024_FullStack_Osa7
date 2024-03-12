import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import storage from "./services/storage";

import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch,
} from "react-router-dom";

import Login from "./components/Login";
import Notification from "./components/Notification";

import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Blogi from "./components/Blogi";
import UserList from "./components/UserList";
import UsersBlogs from "./components/UsersBlogs";
import Footer from "./components/Footer";

import { poistaUser, setUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
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

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(poistaUser(user));
    navigate("/");
  };

  const padding = {
    paddingRight: 5,
  };

  const users = useSelector((state) => state.users);
  const match = useMatch("/users/:id");
  const juuseri = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  const Menu = () => {
    return (
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/newBlog">
          newBlog
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? (
          <em style={padding}>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </em>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
        <p></p>
        <hr></hr>
      </div>
    );
  };

  return (
    <div>
      <h2>Herra Hakkaraisen blogisivut</h2>
      <Menu />

      <Notification />

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/newBlog"
          element={user ? <BlogForm /> : <Navigate replace to="/login" />}
        />

        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UsersBlogs juuseri={juuseri} />} />
        <Route path="/blogs/:id" element={<Blogi />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
