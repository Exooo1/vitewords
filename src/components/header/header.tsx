import { FC } from "react";

import styles from "./header.module.scss";
import logo from "../../assets/images/logo.png";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <section>
        <h1>YourVocabulary</h1>
        <p>vers-1.6.4</p>
      </section>
      <img src={logo} alt="logo" role="logo-picture" title="logo" />
    </header>
  );
};
