import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { ProjectTypeReturn } from "../utils/types/commonTypes";
import { ProfileInitialState } from "../redux/profileReducer";

const instance = axios.create({
  baseURL: "http://localhost:8080/profile"
});

export type TAvatar = {
  lastModified: number;
  lastModifiedDate: any;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export type TProfileInfo = {
  totalWords: number;
  days: number;
  notes: number;
  firstName: string;
  lastName: string;
  avatar: string;
};

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
  },
  getProfileInfo(): AxiosPromise<ProjectTypeReturn<TProfileInfo>> {
    return instance.get<ProjectTypeReturn<TProfileInfo>>("get-profile");
  },
  upload(value: any): AxiosPromise<ProjectTypeReturn<string>> {
    return instance.post<ProjectTypeReturn<string>>("upload", value);
  },
};
