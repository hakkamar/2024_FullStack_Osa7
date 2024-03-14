import { useSelector } from "react-redux";

import { Title3, StyledLink, Lista } from "../tyylit";

const UserList = () => {
  const users = useSelector((state) => state.users);

  if (!users) {
    return null;
  }

  return (
    <Lista>
      <Title3>Users</Title3>
      {users.map((user) => (
        <Lista key={user.id}>
          <StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink>{" "}
          {user.blogs.length} blogia
        </Lista>
      ))}
    </Lista>
  );
};

export default UserList;
