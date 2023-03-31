import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { FullNameType, profileAPI } from "../api/profileAPI";
import { ProjectTypeReturn, ThunkError } from "../Common/Types/CommonType";
import { handlerDeleteHint } from "../Common/usefulFuncs";

type ProfileInitialState = {
  firstName: string;
  lastName: string;
};
const initialState: ProfileInitialState = {
  firstName: "",
  lastName: ""
};

export const fetchGetProfile = createAsyncThunk<
  FullNameType,
  undefined,
  ThunkError
>("profile/fetchGetProfile", async (arg, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await profileAPI.getFullName();
    return { ...data.item };
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
    });
  }
});
export const profileReducer = slice.reducer;
