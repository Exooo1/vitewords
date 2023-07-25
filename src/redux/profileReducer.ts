import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { profileAPI, TProfileInfo } from "../api/profileAPI";
import { ProjectTypeReturn, ThunkError } from "../utils/types/commonTypes";
import { handlerDeleteHint } from "../utils/functionutils";

export type MessageType = {
  message: string;
  writer: string;
  clientId: string;
  _id: string;
};
export type ProfileInitialState = {
  profile: TProfileInfo;
  chat: Array<MessageType>;
};
const initialState: ProfileInitialState = {
  profile: {
    firstName: "",
    lastName: "",
    avatar: "",
    days: 0,
    notes: 0,
    totalWords: 0
  },
  chat: []
};

export const fetchGetProfile = createAsyncThunk<
  ProfileInitialState,
  undefined,
  ThunkError
>("profile/fetchGetProfile", async (arg, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await profileAPI.getFullName();
    return data.item;
  } catch (err) {
    const { response, message } = err as AxiosError<ProjectTypeReturn<null>>;
    response?.data === undefined
      ? handlerDeleteHint(message, dispatch, "error")
      : handlerDeleteHint(response.data.error, dispatch, "error");
    return rejectWithValue({ errors: response?.data.error || message });
  }
});

export const fetchGetProfileInfo = createAsyncThunk<
  TProfileInfo,
  undefined,
  ThunkError
>("profile/fetchGetProfileInfo", async (arg, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await profileAPI.getProfileInfo();
    return data.item;
  } catch (err) {
    const { response, message } = err as AxiosError<ProjectTypeReturn<null>>;
    response?.data === undefined
      ? handlerDeleteHint(message, dispatch, "error")
      : handlerDeleteHint(response.data.error, dispatch, "error");
    return rejectWithValue({ errors: response?.data.error || message });
  }
});

export const fetchSetAvatar = createAsyncThunk<string, FormData, ThunkError>(
  "profile/fetchSetAvatar",
  async (file, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await profileAPI.upload(file);
      return data.item;
    } catch (err) {
      const { response, message } = err as AxiosError<ProjectTypeReturn<null>>;
      response?.data === undefined
        ? handlerDeleteHint(message, dispatch, "error")
        : handlerDeleteHint(response.data.error, dispatch, "error");
      return rejectWithValue({ errors: response?.data.error || message });
    }
  }
);

export const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSetAvatar.fulfilled, (state, action) => {
      state.profile.avatar = action.payload;
    });
    // builder.addCase(fetchGetProfile.fulfilled, (state, action) => {
    //   // state.profile.firstName = action.payload.profile.firstName;
    //   // state.profile.lastName = action.payload.lastName;
    //   // state.profile.email = action.payload.email;
    //   state.chat = action.payload.chat;
    // });
    builder.addCase(fetchGetProfileInfo.fulfilled, (state, action) => {
      state.profile = { ...action.payload };
    });
  }
});
export const profileReducer = slice.reducer;
