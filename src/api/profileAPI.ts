import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { ProjectTypeReturn } from "../Common/Types/CommonType";

const instance = axios.create({
  baseURL: "http://localhost:8080/profile"
});
const { CancelToken } = axios;
const source = CancelToken.source();
export const cancelFetch = () => {
  source.cancel("i canceled this request!");
};

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  // @ts-ignore
  config.headers.Authorization = `Bearer ${window.localStorage.getItem(
    "token"
  )}`;
  return config;
});

export type FullNameType = {
  firstName: string;
  lastName: string;
};

export const profileAPI = {
  getFullName(): AxiosPromise<ProjectTypeReturn<FullNameType>> {
    return instance.get<ProjectTypeReturn<FullNameType>>("/fullname", {
      cancelToken: source.token
    });
  }
};
