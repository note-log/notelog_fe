/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-09 09:58:33
 * @Company: ncuhome
 * @LastEditTime: 2022-09-09 11:13:51
 * @FilePath: \notelog_fe\src\utils\api.ts
 * @Description:
 */
import Toast from "@/components/Toast";
import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
axios.defaults.baseURL = "localhost:8081";
axios.defaults.timeout = 7500;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    token &&
      ((
        config.headers as AxiosRequestHeaders
      ).Authorization = `Bearer ${token}`);
    return config;
  },
  (error: any) => {
    throw new Error(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return Promise.resolve(response);
  },
  (error) => {
    const code = error.response.statusCode;
    if (code) {
      switch (code) {
        case 200:
          Toast.error(error.response.data.message);
          break;
        default:
          Toast.error(error.response.data.message);
          break;
      }
    }
    return Promise.reject(error.response);
  }
);
