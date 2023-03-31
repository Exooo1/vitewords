import React, {FC, useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {HintModal} from "../../Common/ModalComponents/HintModal/HintModal";
import {changeTitle} from "../../Common/usefulFuncs";

import styles from "./auth.module.scss";
import {Slider} from "../Slider/Slider";
import {Header} from "../header/header";
import {CHOICE_AUTH} from "../../constants/constants";

export const Auth: FC = () => {
  useEffect(() => {
    changeTitle("Auth");
  }, []);
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
    setChoose(!choose);
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
      <Header />
      <section className={styles.auth_choose}>{buttons}</section>
      <section className={styles.auth}>
        {choose ? <Outlet /> : <Slider />}
        <HintModal />
      </section>
    </section>
  );
};
