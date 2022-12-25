import { FC, useState } from "react";
import Users from "../components/Users";
import { useGetUsersQuery } from "../queries/getUsersQuery";

/**
 * staleTime의 기본값은 0이므로, 0초 후 바로 stale 상태가 되어 쿼리 인스턴스 mount시 fetch가 발생함
 * staleTime 설정시 staleTime만큼 query가 fresh 상태로 유지되고, 쿼리 인스턴스가 새로 mount 되어도 fetch가 일어나지 않음
 * cacheTime 설정시 inactive 상태일 때 query 결과가 캐시되고, 해당 시간동안 쿼리 인스턴스가 새로 mount 되어도 fetch가 일어나지 않음
 */

const UserList: FC = () => {
  const { data: users } = useGetUsersQuery({
    cacheTime: 3000,
  });

  return <Users users={users || []} />;
};

const StaleTime = () => {
  const [isMounted, setIsMounted] = useState(false);

  return (
    <div>
      <button onClick={() => setIsMounted(true)}>Mount</button>
      <button onClick={() => setIsMounted(false)}>UnMount</button>
      {isMounted && <UserList />}
    </div>
  );
};

export default StaleTime;
