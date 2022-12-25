import { FC, useState } from "react";
import Users from "../components/Users";
import { useGetUsersQuery } from "../queries/getUsersQuery";

/**
 * 하나의 query가 끝나고 다른 query가 실행되면 같은 query key를 사용하더라도 다시 query를 실행함
 * fetching 상태일때 같은 query key의 query를 실행하면 두번째 query는 무시함
 * 보통은 최상단 컨포넌트에서 query를 실행하고, fetching이 끝났을때 하위 컴포넌트를 렌더링 하므로 시점 조절을 잘 해야함
 */

const UserList: FC = () => {
  const { data: users } = useGetUsersQuery({
    staleTime: 0,
    cacheTime: 30000,
  });

  return <Users users={users || []} />;
};

const QueryMount: FC = () => {
  const [isMountedA, setIsMountedA] = useState(true);
  const [isMountedB, setIsMountedB] = useState(true);

  return (
    <div>
      <button onClick={() => setIsMountedA(true)}>Mount A</button>
      <button onClick={() => setIsMountedA(false)}>UnMount A</button>
      <button onClick={() => setIsMountedB(true)}>Mount B</button>
      <button onClick={() => setIsMountedB(false)}>UnMount B</button>

      <h1>유저목록 A</h1>
      {isMountedA && <UserList />}
      {!isMountedA && <small>마운트되지 않음</small>}

      <h1>유저목록 B</h1>
      {isMountedB && <UserList />}
      {!isMountedB && <small>마운트되지 않음</small>}
    </div>
  );
};

export default QueryMount;
