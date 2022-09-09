/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-09 09:58:33
 * @Company: ncuhome
 * @LastEditTime: 2022-09-09 11:40:58
 * @FilePath: \notelog_fe\src\utils\api.ts
 * @Description:
 */
import qs from "qs";
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
        console.log(err);
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
