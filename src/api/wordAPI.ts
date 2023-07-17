import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { ProjectTypeReturn } from "../utils/types/commonTypes";

export type WordType = {
  word: string;
  translate: string;
  description: string;
  added: string;
  _id?: string;
};
export type SortChoice = "ADDED" | "DESCRIPTION";
export type SortType = {
  isSort: boolean;
  sortType: SortChoice;
};
export type ProfileType = {
  words: Array<WordType>;
  totalWords: number;
};
export type DeleteWordType = {
  word: string;
  id: string;
};
export type WordChangeType = {
  word: string;
  translate: string;
  description: string;
  added: string;
  id: string;
};
const instance = axios.create({
  baseURL: "http://localhost:8080/words"
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers)
    config.headers.Authorization = `Bearer ${window.localStorage.getItem(
      "token"
    )}`;
  return config;
});

export const wordApi = {
  getWords(count: number): AxiosPromise<ProjectTypeReturn<ProfileType>> {
    return instance.get<ProjectTypeReturn<ProfileType>>(
        `/?count=${count}`
    );
  },
  addWord(values: WordType): AxiosPromise<ProjectTypeReturn<WordType>> {
    return instance.post<ProjectTypeReturn<WordType>>("add-word", values);
  },
  deleteWord(value: DeleteWordType): AxiosPromise<ProjectTypeReturn<null>> {
    return instance.delete<ProjectTypeReturn<null>>(
      `delete-word?id=${value.id}&letter=${value.word[0].toLowerCase()}`
    );
  },
  changeWord(values: WordChangeType): AxiosPromise<ProjectTypeReturn<null>> {
    return instance.put<ProjectTypeReturn<null>>("change-word", values);
  },
  findWords(word: string): AxiosPromise<ProjectTypeReturn<Array<WordType>>> {
    return instance.get<ProjectTypeReturn<Array<WordType>>>(
      `find-words?word=${word}`
    );
  },
  addedWords(
    values: SortType
  ): AxiosPromise<ProjectTypeReturn<Array<WordType>>> {
    return instance.post<ProjectTypeReturn<Array<WordType>>>(
      `sort-words`,
      values
    );
  },
  downloadFile() {
    return instance.get("download-words");
  }
};
