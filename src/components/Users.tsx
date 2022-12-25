import { FC } from "react";
import { User } from "../apis/getUsersApi";

interface UsersProps {
  users: User[];
}

const Users: FC<UsersProps> = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <strong>[{user.id}]</strong> <span>{user.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default Users;
