import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserList = () => {
  const users = useSelector((state) => state.users);

  if (!users) {
    return null;
  }

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link> {user.blogs.length}
        </div>
      ))}
    </div>
  );
};

export default UserList;
