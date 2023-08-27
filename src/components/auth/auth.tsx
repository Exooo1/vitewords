import React, { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { HintModal } from "../modals/hintModal/hint-modal";
import { changeTitle } from "../../utils/functionutils";
import { Slider } from "../slider/slider";
import { Header } from "../header/header";
import { CHOICE_AUTH } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../redux/reduxUtils";
import { fetchGetAuth } from "../../redux/authReducer";
import { authReselect } from "../../redux/reselect";
import styles from "./auth.module.scss";

export const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector(authReselect);
  const auths = useAppSelector(state => state.authReducer);

  useEffect(() => {
    dispatch(fetchGetAuth());
  }, []);

  useEffect(() => {
    changeTitle("Auth");
    if (auth === 1) navigate("/app");
  }, [auth]);

  const [choose, setChoose] = useState<boolean>(true);
  const [choice, setChoice] = useState(CHOICE_AUTH);
  const handlerChoice = (value: number) => {
    setChoice(
      choice.map(item =>
        item.id === value
          ? { ...item, isActive: true }
          : { ...item, isActive: false }
      )
    );
    if (value === 1) setChoose(true);
    else setChoose(false);
  };
  const buttons = choice.map(item => (
    <button
      key={item.id}
      onClick={() => handlerChoice(item.id)}
      style={{ background: item.isActive ? "#323645" : "white" }}
    ></button>
  ));
  return (
    <section>
      <HintModal />
      <Header />
      <section className={styles.auth_choose}>{buttons}</section>
      <section className={styles.auth}>
        {choose ? <Outlet /> : <Slider />}
      </section>
    </section>
  );
};
