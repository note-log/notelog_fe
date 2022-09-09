/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-09 14:40:21
 * @Company: ncuhome
 * @LastEditTime: 2022-09-09 18:19:44
 * @FilePath: \notelog_fe\src\store\index.ts
 * @Description:
 */
import { get } from "@utils/api";
import create from "zustand";

export interface Response<T> {
  status: number;
  message: string;
  data: Record<string, T>;
}
interface User {
  username: string;
  auth: boolean;
  fetch: () => Promise<boolean>;
}

export const useStore = create<User>((set) => ({
  username: "",
  auth: false,
  fetch: async () => {
    try {
      const res = await get("/api/user/hello");
      if ((res as Response<string>).status == 1) {
        set({ username: (res as Response<string>).data.username, auth: true });
        return Promise.resolve(true);
      }
      return Promise.reject(false);
    } catch (error) {
      console.error(error);
      return Promise.reject(false);
    }
  },
}));
