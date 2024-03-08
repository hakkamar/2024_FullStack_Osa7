import { useState } from "react";
import { useDispatch } from "react-redux";
import { haeJaAsetaUser } from "../reducers/userReducer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(haeJaAsetaUser({ username, password }));

    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input id="login-button" type="submit" value="Login" />
    </form>
  );
};

export default Login;
