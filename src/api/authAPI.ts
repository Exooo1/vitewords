import axios, { AxiosPromise } from "axios";
import { InputType } from "../Hooks/Form";
import { ProjectTypeReturn } from "../Common/Types/CommonType";

const instance = axios.create({
  baseURL: "http://localhost:8080/auth/"
});
instance.interceptors.request.use(config => {
  // @ts-ignore
  config.headers.Authorization = `Bearer ${window.localStorage.getItem(
    "token"
  )}`;
  return config;
});

export type AuthLoginType = {
  token: string;
  auth: number;
};
export type LoginType = {
  email: string;
  password: string;
};
export type EmailType = {
  email: string;
  name: string;
  verify: string;
};
export const apiAuth = {
  registration(values: InputType): AxiosPromise<ProjectTypeReturn<string>> {
    const result = {
      firstName: values.name,
      lastName: values.surname,
      email: values.email,
      password: values.password
    };
    return instance.post<ProjectTypeReturn<string>>("registration", result);
  },
  sendEmail(values: EmailType): AxiosPromise<ProjectTypeReturn<null>> {
    return instance.post("email", values);
  },
  login({
    email,
    password
  }: LoginType): AxiosPromise<ProjectTypeReturn<AuthLoginType>> {
    return instance.post<ProjectTypeReturn<AuthLoginType>>("login", {
      email,
      password
    });
  },
  confirm(id: string): AxiosPromise<ProjectTypeReturn<string>> {
    return instance.post<ProjectTypeReturn<string>>("confirm", { id });
  },
  getAuth(): AxiosPromise<ProjectTypeReturn<number>> {
    return instance.get<ProjectTypeReturn<number>>("me");
  },
  logout(): AxiosPromise<ProjectTypeReturn<number>> {
    return instance.put<ProjectTypeReturn<number>>("logout");
  }
};
