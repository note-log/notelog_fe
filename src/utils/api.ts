/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-09 09:58:33
 * @Company: ncuhome
 * @LastEditTime: 2022-09-10 16:48:18
 * @FilePath: /note-log/src/utils/api.ts
 * @Description:
 */
import qs from "qs";
import Toast from "@/components/Toast";
import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
axios.defaults.baseURL = "http://localhost:8081";
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
    const code = error.response.data.status;
    if (code) {
      switch (code) {
        case 1:
          Toast.error(error.response.data.message);
          break;
        case 401:
          Toast.error("登录过期，请重新登录");
          break;
        case 404:
          Toast.error("请求资源不存在");
        case 409:
          Toast.error("不可接受的请求");
        case 410:
          Toast.error("请求出现问题");
        case 500:
          Toast.error("服务器出现问题");
        default:
          Toast.error(error.response.data.message);
          break;
      }
    }
    return Promise.reject(error.response);
  }
);

/**
 * get method
 * @param {String} url [requesting url]
 * @param {Object} params [request params]
 */
export const get = (url: string, params: object = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
};

/**
 * post method
 * @param {String} url [requesting url]
 * @param {Object} params [request params]
 */
export const post = (url: string, params: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
};
/**
 * put method
 * @param {String} url [requesting url]
 * @param {Object} params [request params]
 */
export const put = (url: string, data: any = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
};

/**
 * delete method
 * @param {String} url [requesting url]
 * @param {Object} params [request params]
 */
export const Delete = (url: string, params: object = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params,
        paramsSerializer: (params) => qs.stringify(params, { indices: false }),
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
};
