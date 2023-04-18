import React, { FC } from "react";
import styles from "./loading.module.scss";
import logo from "../../../assets/images/logo.png";

type LoadingType = {
  width: string;
};

export const Loading: FC<LoadingType> = ({ width }) => {
  return (
    <div className={styles.loading}>
      <img style={{ width: `${width}px` }} src={logo} alt={"loading"} />
    </div>
  );
};
