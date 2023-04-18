import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  DeleteWordType,
  ProfileType,
  SortChoice,
  wordApi,
  WordChangeType,
  WordType
} from "../api/wordAPI";
import { ProjectTypeReturn, ThunkError } from "../utils/types/commonTypes";
import { handlerDeleteHint } from "../utils/usefulFuncs";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import { AppRootState } from "./reduxUtils";

type WordsInitialType = {
  words: Array<WordType>;
  totalWords: number;
  isAdded: boolean;
  isLoading: boolean;
};
type GetWordsType = {
  words: Array<WordType>;
  totalWords: number;
};
const initialState: WordsInitialType = {
  words: [],
  totalWords: 0,
  isAdded: true,
  isLoading: false
};

export const fetchGetWords = createAsyncThunk<GetWordsType, number, ThunkError>(
  "words/fetchGetWords",
  async (value, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await wordApi.getWords(value);
      return { words: data.item.words, totalWords: data.item.totalWords };
    } catch (err) {
      const { response, message } = err as AxiosError<
        ProjectTypeReturn<ProfileType>
      >;
      if (response?.data === undefined)
        handlerDeleteHint(message, dispatch, "error");
      else handlerDeleteHint(response.data.error, dispatch, "error");
      return rejectWithValue({ errors: response?.data.error || message });
    }
  }
);

export const fetchAddWord = createAsyncThunk<WordType, WordType, ThunkError>(
  "words/fetchAddWord",
  async (
    { word, translate, description, added },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const upperWord = word[0].toUpperCase() + word.slice(1);
      const { data } = await wordApi.addWord({
        word: upperWord,
        translate,
        description,
        added
      });
      handlerDeleteHint(data.message || "Added", dispatch, "done");
      return data.item;
    } catch (err) {
      const { response, message } = err as AxiosError<
        ProjectTypeReturn<WordType>
      >;
      if (response?.data === undefined)
        handlerDeleteHint(message, dispatch, "error");
      else handlerDeleteHint(response.data.error, dispatch, "error");
      return rejectWithValue({ errors: response?.data.error || message });
    }
  }
);

export const fetchDeleteWord = createAsyncThunk<
  DeleteWordType,
  DeleteWordType,
  ThunkError
>(
  "words/fetchDeleteWord",
  async ({ id, word }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await wordApi.deleteWord({ id, word });
      handlerDeleteHint(`${data.item} ${word}`, dispatch, "done");
      return { id, word };
    } catch (err) {
      const { response, message } = err as AxiosError<ProjectTypeReturn<null>>;
      if (response?.data === undefined)
        handlerDeleteHint(message, dispatch, "error");
      else handlerDeleteHint(response.data.error, dispatch, "error");
      return rejectWithValue({ errors: response?.data.error || message });
    }
  }
);

export const fetchChangeWord = createAsyncThunk<
  WordChangeType,
  WordChangeType,
  ThunkError
>(
  "words/fetchChangeWord",
  async (
    { id, added, word, translate, description },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await wordApi.changeWord({
        word,
        translate,
        description,
        id,
        added
      });
      handlerDeleteHint(data.item || "Changed", dispatch, "done");
      return { word, translate, description, id, added };
    } catch (err) {
      const { response, message } = err as AxiosError<ProjectTypeReturn<null>>;
      if (response?.data === undefined)
        handlerDeleteHint(message, dispatch, "error");
      else handlerDeleteHint(response.data.error, dispatch, "error");
      return rejectWithValue({ errors: response?.data.error || message });
    }
  }
);

export const fetchWordFind = createAsyncThunk<Array<WordType>, string>(
  "words/fetchWordFind",
  async (word, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await wordApi.findWords(word);
      return data.item;
    } catch (err) {
      const { response, message } = err as AxiosError<
        ProjectTypeReturn<WordType>
      >;
      if (response?.data === undefined)
        handlerDeleteHint(message, dispatch, "error");
      else handlerDeleteHint(response.data.error, dispatch, "error");
      return rejectWithValue({ errors: response?.data.error || message });
    }
  }
);

export const fetchSortWords = createAsyncThunk<Array<WordType>, SortChoice>(
  "words/fetchAddedWords",
  async (sortType, { dispatch, rejectWithValue, getState }) => {
    const isSort = getState() as AppRootState;
    try {
      const { data } = await wordApi.addedWords({
        isSort: isSort.wordsSlice.isAdded,
        sortType
      });
      return data.item;
    } catch (err) {
      const { response, message } = err as AxiosError<
        ProjectTypeReturn<string>
      >;
      if (response?.data === undefined)
        handlerDeleteHint(message, dispatch, "error");
      else handlerDeleteHint(response.data.error, dispatch, "error");
      return rejectWithValue({ errors: response?.data.error || message });
    }
  }
);

export const fetchDownloadFile = createAsyncThunk<any, string>(
  "words/fetchDownloadFile",
  async (arg, { dispatch, rejectWithValue }) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    try {
      const { data } = await wordApi.downloadFile();
      if (arg === "pdf") {
        const docDefinition: TDocumentDefinitions = {
          content: <Content | Content[]>[
            {
              text: "Your Vocabulary",
              fontSize: 16,
              alignment: "center",
              bold: true
            },
            { text: data, fontSize: 10 }
          ]
        };
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.download("my-pdf.pdf");
      } else {
        const blob = new Blob([data]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `YourWords.${arg}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (err) {
      const { response, message } = err as AxiosError<ProjectTypeReturn<null>>;
      if (response?.data === undefined)
        handlerDeleteHint(message, dispatch, "error");
      else handlerDeleteHint(response.data.error, dispatch, "error");
      return rejectWithValue({ errors: response?.data.error || message });
    }
  }
);
const slice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchGetWords.fulfilled, (state, action) => {
      state.words = action.payload.words;
      state.totalWords = action.payload.totalWords;
    });
    builder.addCase(fetchAddWord.fulfilled, (state, action) => {
      state.words.unshift({ ...action.payload });
      state.totalWords += 1;
    });
    builder.addCase(fetchDeleteWord.fulfilled, (state, action) => {
      const id = state.words.findIndex(item => item._id === action.payload.id);
      state.words.splice(id, 1);
      state.totalWords -= 1;
    });
    builder.addCase(fetchChangeWord.fulfilled, (state, action) => {
      const id = state.words.findIndex(item => item._id === action.payload.id);
      state.words[id] = { ...action.payload, _id: action.payload.id };
    });
    builder.addCase(fetchWordFind.fulfilled, (state, action) => {
      state.words = action.payload;
    });
    builder.addCase(fetchSortWords.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchSortWords.fulfilled, (state, action) => {
      state.isAdded = !state.isAdded;
      state.words = action.payload;
      state.isLoading = false;
    });
  }
});

export const wordsSlice = slice.reducer;
