import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { ProjectTypeReturn } from "../utils/types/commonTypes";
import { ProfileInitialState } from "../redux/profileReducer";

const instance = axios.create({
  baseURL: "http://localhost:8080/profile"
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers)
    config.headers.Authorization = `Bearer ${window.localStorage.getItem(
      "token"
    )}`;
  return config;
});

export const profileAPI = {
  getFullName(): AxiosPromise<ProjectTypeReturn<ProfileInitialState>> {
    return instance.get<ProjectTypeReturn<ProfileInitialState>>("/fullname");
  }
};
