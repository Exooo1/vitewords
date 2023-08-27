import { FC } from "react";
import styles from "./loading.module.scss";
import logo from "../../../assets/images/logo.png";
import { imgAttribute } from "../../../utils/functionutils";

type LoadingType = {
  width: string;
};

export const Loading: FC<LoadingType> = ({ width }) => {
  return (
    <section className={styles.loading}>
      <img
        {...imgAttribute({
          src: logo,
          alt: "loading",
          role: "loading",
          width: "0px",
          title: "loading"
        })}
        style={{ width: `${width}px` }}
        src={logo}
        alt="loading"
        role="loading-picture"
        title="loading"
      />
    </section>
  );
};
