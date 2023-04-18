import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { profileAPI } from "../api/profileAPI";
import { ProjectTypeReturn, ThunkError } from "../Common/Types/CommonType";
import { handlerDeleteHint } from "../Common/usefulFuncs";

export type MessageType = {
  message: string;
  writer: string;
  clientId: string;
  _id: string;
};
export type ProfileInitialState = {
  firstName: string;
  lastName: string;
  email: string;
  chat: Array<MessageType>;
};
const initialState: ProfileInitialState = {
  firstName: "",
  lastName: "",
  email: "",
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

export const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchGetProfile.fulfilled, (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.chat = action.payload.chat;
    });
  }
});
export const profileReducer = slice.reducer;
