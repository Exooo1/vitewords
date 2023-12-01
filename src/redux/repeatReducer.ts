import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WordType } from "../api/wordAPI";
import { ProjectTypeReturn, ThunkError } from "../utils/types/commonTypes";
import { AxiosError } from "axios";
import { handlerDeleteHint } from "../utils/functionutils";
import { apiRepeat } from "../api/repeatApi";

type TInitialState = {
  words: Array<WordType>;
};

const initialState: TInitialState = {
  words: []
};

export const fetchGetWords = createAsyncThunk<
  Array<WordType>,
  undefined,
  ThunkError
>("fetchGetWords", async (status, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await apiRepeat.getRepeatWords();
    return data.item;
  } catch (err) {
    const { response, message } = err as AxiosError<ProjectTypeReturn<null>>;
    response?.data === undefined
      ? handlerDeleteHint(message, dispatch, "error")
      : handlerDeleteHint(response.data.error, dispatch, "error");
    return rejectWithValue({ errors: response?.data.error || message });
  }
});

export const slice = createSlice({
  name: "repeat",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchGetWords.fulfilled, (state, action) => {
      state.words = action.payload;
    });
  }
});

export const repeatReducer = slice.reducer;
