import { useState } from "react";

const Login = ({ doLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    doLogin({ username, password });
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
