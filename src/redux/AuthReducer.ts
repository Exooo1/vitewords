import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { InputType } from "../hooks/Form";
import { apiAuth, AuthLoginType, LoginType } from "../api/authAPI";
import { ProjectTypeReturn, ThunkError } from "../Common/Types/CommonType";
import { handlerDeleteHint } from "../Common/usefulFuncs";

export type InitialStateAuth = {
  auth: number;
  resultCode: number;
};
const initialState: InitialStateAuth = {
  auth: 0,
  resultCode: 0
};
export const fetchRegistration = createAsyncThunk<
  number,
  InputType,
  ThunkError
>(
  "auth/fetchRegistration",
  async ({ name, password, email, surname }, { dispatch, rejectWithValue }) => {
    const person = { email, password, name, surname };
    try {
      const auth = await apiAuth.registration(person);
      const verify = auth.data.item || "";
      if (auth.data.resultCode === 1)
        await apiAuth.sendEmail({ email, name, verify });
      return auth.data.resultCode;
    } catch (err) {
      const { message, response } = err as AxiosError<
        ProjectTypeReturn<string>
      >;
      if (response?.data === undefined)
        handlerDeleteHint(message, dispatch, "error");
      else handlerDeleteHint(response.data.error, dispatch, "error");
      return rejectWithValue({ errors: message });
    }
  }
);
export const fetchLogin = createAsyncThunk<number, LoginType, ThunkError>(
  "auth/fetchLogin",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await apiAuth.login({ email, password });
      window.localStorage.setItem("token", data.item.token);
      return data.item.auth;
    } catch (err) {
      const { response, message } = err as AxiosError<
        ProjectTypeReturn<AuthLoginType>
      >;
      if (response?.data === undefined)
        handlerDeleteHint(message, dispatch, "error");
      else handlerDeleteHint(response.data.error, dispatch, "error");
      return rejectWithValue({ errors: response?.data.error || message });
    }
  }
);
export const fetchGetAuth = createAsyncThunk<number, undefined>(
  "auth/fetchGetAuth",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await apiAuth.getAuth();
      return data.item;
    } catch (err) {
      const { response, message } = err as AxiosError<
        ProjectTypeReturn<number>
      >;
      if (response?.data === undefined)
        handlerDeleteHint(message, dispatch, "error");
      else handlerDeleteHint(response.data.error, dispatch, "error");
      return rejectWithValue({ errors: response?.data.error || message });
    }
  }
);
export const fetchLogOut = createAsyncThunk<number, undefined, ThunkError>(
  "auth/fetchLogOut",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await apiAuth.logout();
      window.localStorage.removeItem("token");
      return data.item;
    } catch (err) {
      const { response, message } = err as AxiosError<
        ProjectTypeReturn<number>
      >;
      if (response?.data === undefined)
        handlerDeleteHint(message, dispatch, "error");
      else handlerDeleteHint(response.data.error, dispatch, "error");
      return rejectWithValue({ errors: response?.data.error || message });
    }
  }
);

export const fetchConfirmPassword = createAsyncThunk<
  undefined,
  string,
  ThunkError
>("auth/fetchConfirmPassword", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await apiAuth.confirm(id);
    handlerDeleteHint(data.item, dispatch, "error");
  } catch (err) {
    const { response, message } = err as AxiosError<ProjectTypeReturn<string>>;
    if (response?.data === undefined)
      handlerDeleteHint(message, dispatch, "error");
    else handlerDeleteHint(response.data.error, dispatch, "error");
    return rejectWithValue({ errors: response?.data.error || message });
  }
});
export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.resultCode = action.payload;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.auth = action.payload;
    });
    builder.addCase(fetchGetAuth.fulfilled, (state, action) => {
      state.auth = action.payload;
    });
    builder.addCase(fetchLogOut.fulfilled, (state, action) => {
      state.auth = action.payload;
    });
  }
});

export const authReducer = slice.reducer;
