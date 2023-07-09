import { createSlice } from "@reduxjs/toolkit";
import { fetchRegistration } from "./authReducer";

type ILoadingState = {
  isAuth: boolean;
};

const initialState: ILoadingState = {
  isAuth: false
};

const slice = createSlice({
  name: "loading",
  reducers: {
    handlerIsAuth: state => {
      state.isAuth = true;
    }
  },
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchRegistration.fulfilled, state => {
      state.isAuth = false;
    });
  }
});

export const loadingReducer = slice.reducer;

export const { handlerIsAuth } = slice.actions;
