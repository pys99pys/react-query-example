export interface User {
  id: number;
  name: string;
}

const originUsers: User[] = [
  {
    id: 1,
    name: "dykim",
  },
  {
    id: 2,
    name: "erlee",
  },
  {
    id: 3,
    name: "ycyoon",
  },
];

export const getUsersApi = async (): Promise<User[]> => {
  console.log("유저정보 조회 API 호출!");

  const copiedUsers = [...originUsers];

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 1000);
  });

  return copiedUsers;
};

export const addUserApi = async (userName: string): Promise<User[]> => {
  console.log("유저정보 추가 API 호출!");

  originUsers.push({
    id: originUsers.length + 1,
    name: userName,
  });

  const copiedUsers = [...originUsers];

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 1000);
  });

  return copiedUsers;
};
