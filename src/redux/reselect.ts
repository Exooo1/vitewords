import { AppRootState } from "./reduxUtils";

export const authReselect = (state: AppRootState) => state.authReducer.auth;
export const profileReselect = (state: AppRootState) => state.wordsSlice;
export const resultCodeReselect = (state: AppRootState) =>
  state.authReducer.resultCode;
