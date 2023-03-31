import { ActionCreatorsMapObject, bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { store } from "./Store";

export type AppRootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
export const useActions = <T extends ActionCreatorsMapObject<any>>(
  actions: T
) => {
  const dispatch = useAppDispatch();
  return useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, []);
};
