import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { errorsReducer } from "./errorsReducer";
import { authReducer } from "./authReducer";
import { wordsSlice } from "./wordsReducer";
import { profileReducer } from "./profileReducer";
import { wordApi } from "./wordRTK";
import { loadingReducer } from "./loadingReducer";
import {repeatReducer} from "./repeatReducer";

const reducers = combineReducers({
  loadingReducer,
  errorsReducer,
  authReducer,
  wordsSlice,
  profileReducer,
  repeatReducer,
  [wordApi.reducerPath]: wordApi.reducer
});
export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(wordApi.middleware, thunkMiddleware)
});
