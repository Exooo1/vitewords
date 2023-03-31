import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wordApi = createApi({
  reducerPath: "wordApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: build => ({
    getPost: build.query({
      query: () => ({
        url: ``,
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
      })
    }),
    findWord: build.mutation<ResultTypeMutation, string>({
      query: (word: string) => ({
        url: `/word-find?word=${word}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
      })
    })
  })
});

type ResultTypeMutation = {
  resultCode: number;
  item: Array<any>;
  error: string;
};

export const { useFindWordMutation, useGetPostQuery } = wordApi;
