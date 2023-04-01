import React from "react";
import styles from "./loading.module.scss";
import logo from "../../../assets/Images/logo.png";

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <img src={logo} alt={"loading"} />
    </div>
  );
};
