import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { addUserApi, getUsersApi, User } from "../apis/getUsersApi";

export const useGetUsersQuery = (
  options?: UseQueryOptions<Promise<User[]>, unknown, User[], "getUsers">
): UseQueryResult<User[]> => useQuery("getUsers", getUsersApi, options);

export const useAddUserMutation = (): UseMutationResult<
  User[],
  unknown,
  string
> => useMutation((userName: string) => addUserApi(userName));
