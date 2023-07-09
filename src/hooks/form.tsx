import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { useAppDispatch } from "../redux/reduxUtils";
import { fetchLogin, fetchRegistration } from "../redux/authReducer";
import { handlerDeleteHint } from "../utils/functionutils";
import info from "../assets/images/inform.png";
import {handlerIsAuth} from "../redux/loadingReducer";

export type InputType = {
  name: string;
  surname: string;
  email: string;
  password: string;
};
export type ItemProfileType = {
  id: number;
  name: string;
  change: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  plc: string;
  img: string;
};
type FormType = {
  changeName: (e: ChangeEvent<HTMLInputElement>) => void;
  changeSurname: (e: ChangeEvent<HTMLInputElement>) => void;
  changeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  changePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  itemsProfile: Array<ItemProfileType>;
  createAccount: () => void;
  login: (e: KeyboardEvent, type: string) => void;
  buttonLogin: () => void;
} & InputType;
export const useForm = (): FormType => {
  const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const changeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const changeSurname = (e: ChangeEvent<HTMLInputElement>) =>
    setSurname(e.target.value);
  const changeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );
  const changePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    []
  );
  const createAccount = () => {
    if (name.length < 3 || surname.length < 3) {
      return handlerDeleteHint(
        "The first and last name fields must contain more than 3 characters",
        dispatch,
        "error"
      );
    }
    if (password.length! < 6)
      return handlerDeleteHint("Password incorrect", dispatch, "error");
    !reg.test(email)
      ? handlerDeleteHint("Email invalid", dispatch, "error")
      : dispatch(
            fetchRegistration({
              name: name[0].toUpperCase() + name.slice(1),
              surname: surname[0].toUpperCase() + surname.slice(1),
              password,
              email
            })
        );
    dispatch(handlerIsAuth())
  };

  const login = (e: KeyboardEvent, type: string) => {
    if (e.key === "Enter" || e.type === "click") {
      if (password.length! < 6)
        return handlerDeleteHint("Password incorrect", dispatch, "error");
      !reg.test(email)
        ? handlerDeleteHint("Email invalid", dispatch, "error")
        : dispatch(
            type === "login"
              ? fetchLogin({
                  email,
                  password
                })
              : fetchRegistration({
                  name: name[0].toUpperCase() + name.slice(1),
                  surname: surname[0].toUpperCase() + surname.slice(1),
                  password,
                  email
                })
          );
      dispatch(handlerIsAuth())
    }
  };

  const buttonLogin = () => {
    if (password.length! < 6)
      return handlerDeleteHint("Password incorrect", dispatch, "error");
    !reg.test(email)
      ? handlerDeleteHint("Email invalid", dispatch, "error")
      : dispatch(
          fetchLogin({
            email,
            password
          })
        );
    dispatch(handlerIsAuth())
  };

  const itemsProfile: Array<ItemProfileType> = [
    {
      id: 1,
      name: name,
      change: changeName,
      type: "text",
      plc: "First name",
      img: info
    },
    {
      id: 2,
      name: surname,
      change: changeSurname,
      type: "text",
      plc: "Last name",
      img: info
    }
  ];
  return {
    name,
    surname,
    email,
    password,
    changeEmail,
    changePassword,
    itemsProfile,
    changeName,
    changeSurname,
    createAccount,
    login,
    buttonLogin
  };
};
