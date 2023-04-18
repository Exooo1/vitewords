import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { errorsReducer } from "./errorsReducer";
import { authReducer } from "./authReducer";
import { wordsSlice } from "./wordsReducer";
import { profileReducer } from "./profileReducer";
import { wordApi } from "./wordRTK";

const reducers = combineReducers({
  errorsReducer,
  authReducer,
  wordsSlice,
  profileReducer,
  [wordApi.reducerPath]: wordApi.reducer
});
export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(wordApi.middleware, thunkMiddleware)
});
