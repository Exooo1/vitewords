import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { errorsReducer } from "./ErrorsReducer";
import { authReducer } from "./AuthReducer";
import { wordsSlice } from "./WordsReducer";
import { profileReducer } from "./ProfileReducer";
import { wordApi } from "./WordRTK";

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
