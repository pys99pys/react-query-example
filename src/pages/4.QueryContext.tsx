import { FC } from "react";
import Users from "../components/Users";
import { useGetUsersQuery } from "../queries/getUsersQuery";

/**
 * 동일한 query key를 사용하는 query는 독립된 공간에서 실행되어도 onSuccess, isFetching, isFetched 등의 상태가 공유되기 때문에 주의해야함
 * query key나 query client를 분리하여 별개의 query로 동작시키는 방법을 생각해볼 수 있음
 * 대부분 최상위 컴포넌트에서 query를 조회하고, 하위 컴포넌트에서는 refetch만 시키기 때문에 큰 문제는 없음
 */

interface UserListProps {
  type: "A" | "B";
}

const consoleWithTextColor = (type: "A" | "B", message: string) => {
  let color = "";

  switch (type) {
    case "A":
      color = "#ff0000";
      break;
    case "B":
      color = "#0000ff";
      break;
    default:
  }

  console.log(`%c[${type}] ${message}`, `color: ${color}`);
};

const UserList: FC<UserListProps> = ({ type }) => {
  const {
    isLoading,
    isFetching,
    isFetched,
    data: users,
    refetch,
    remove,
  } = useGetUsersQuery({
    refetchOnWindowFocus: false,
    onSuccess: () => {
      consoleWithTextColor(type, `onSuccess!`);
    },
  });

  consoleWithTextColor(type, `isLoading: ${isLoading}`);
  consoleWithTextColor(type, `isFetching: ${isFetching}`);
  consoleWithTextColor(type, `isFetched: ${isFetched}`);

  return (
    <>
      <h1>유저목록 {type}</h1>
      <button onClick={() => refetch()}>refetch</button>
      <button onClick={() => remove()}>remove</button>
      <Users users={users || []} />
    </>
  );
};

const QueryContext: FC = () => {
  return (
    <div>
      <UserList type="A" />
      <UserList type="B" />
    </div>
  );
};

export default QueryContext;
