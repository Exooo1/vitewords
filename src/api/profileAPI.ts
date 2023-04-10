import axios, {AxiosPromise, AxiosRequestConfig} from "axios";
import {ProjectTypeReturn} from "../Common/Types/CommonType";
import {ProfileInitialState} from "../redux/ProfileReducer";

const instance = axios.create({
    baseURL: "http://localhost:8080/profile"
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config.headers) config.headers.Authorization = `Bearer ${window.localStorage.getItem(
        "token"
    )}`;
    return config;
});

export const profileAPI = {
    getFullName(): AxiosPromise<ProjectTypeReturn<ProfileInitialState>> {
        return instance.get<ProjectTypeReturn<ProfileInitialState>>("/fullname");
    }
};
