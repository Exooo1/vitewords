import styles from "./progress-bar.module.scss";
import { FC } from "react";

type TProgressBar = {
  start: number;
  end: number;
  rest: number;
  count: number;
};

export const ProgressBar: FC<TProgressBar> = ({ start, end, rest, count }) => {
  const percent = (count / end) * 100;
  return (
    <section className={styles.bar}>
      <section className={styles.bar_under}>
        <div>
          <h1>{rest}</h1>
        </div>
      </section>
      <section className={styles.bar_information}>
        <p>{start}</p>
        {end >= 5000 ? (
          <p style={{ fontSize: "20px" }}>&#8734;</p>
        ) : (
          <p>{end}</p>
        )}
      </section>
      <section className={styles.bar_line}>
        <div style={{ width: `${percent}%` }}></div>
      </section>
    </section>
  );
};
