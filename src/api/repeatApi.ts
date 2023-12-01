import axios, { AxiosInstance, AxiosPromise } from "axios";
import { ProjectTypeReturn } from "../utils/types/commonTypes";
import { WordType } from "./wordAPI";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/repeat/"
});
instance.interceptors.request.use(config => {
  if (config.headers)
    config.headers.Authorization = `Bearer ${window.localStorage.getItem(
      "token"
    )}`;
  return config;
});

export const apiRepeat = {
  getRepeatWords(): AxiosPromise<ProjectTypeReturn<Array<WordType>>> {
    return instance.get<ProjectTypeReturn<Array<WordType>>>("get-words");
  }
};
