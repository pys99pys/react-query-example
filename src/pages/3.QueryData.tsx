import { FC, useEffect, useState } from "react";
import { User } from "../apis/getUsersApi";
import Users from "../components/Users";
import { useAddUserMutation, useGetUsersQuery } from "../queries/getUsersQuery";
import { queryClient } from "../queryClient";

/**
 * fetch없이 data만 필요한 경우 useQuery의 1. enable을 false로 하거나, 2. query cache를 사용할 수 있음
 * 같은 query key의 query 결과가 변경된 경우 1의 경우 결과 state가 공유되기 때문에 re-render가 발생함
 * 2의 경우 state가 아니고 getQueryData 함수에 의한 결과값 반환이므로 re-render 되지 않음
 */

const UserListWithEnableQuery: FC = () => {
  const { data: users } = useGetUsersQuery();
  const { mutate } = useAddUserMutation();

  return (
    <div>
      <h1>유저 목록 (enable query)</h1>
      <button
        onClick={() => {
          const userName = window.prompt("User Name");

          if (userName) {
            mutate(userName);
          }
        }}
      >
        유저 추가
      </button>
      <Users users={users || []} />
    </div>
  );
};

const UserListWithDisableQuery: FC = () => {
  const { data: users } = useGetUsersQuery({ enabled: false });

  return (
    <div>
      <h1>유저 목록 (disable query)</h1>
      <Users users={users || []} />
    </div>
  );
};

const UserListWithQueryCache: FC = () => {
  const users = queryClient.getQueryData("getUsers");
  const typedUsers = (users || []) as User[];

  return (
    <div>
      <h1>유저 목록 (query cache)</h1>
      <Users users={typedUsers || []} />
    </div>
  );
};

const QueryData: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      // setIsLoaded(true);
    }, 2000);
  }, []);

  return (
    <div>
      {/* <UserListWithEnableQuery /> */}
      <UserListWithDisableQuery />
      <UserListWithQueryCache />
      {/* {isLoaded && <UserListWithQueryCache />} */}
      <button onClick={() => setTrigger(+new Date())}>rerender</button>
    </div>
  );
};

export default QueryData;
