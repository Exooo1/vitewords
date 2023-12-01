import styles from "./progress-bar.module.scss";
import React, { FC, memo, useEffect, useState } from "react";

type TProgressBar = {
  start: number;
  end: number;
  rest: number;
  count: number;
  color: string;
};
let timeResize: any = 0;
export const ProgressBar: FC<TProgressBar> = memo(
  ({ start, end, rest, count, color }) => {
    const percent = (count / end) * 100;
    const [currentWidth, setCurrentWidth] = useState<number>(0);

    const handlerResize = (time?: number) => {
      if (timeResize) clearTimeout(timeResize);
      timeResize = setTimeout(
        () => {
          const div = document.getElementById("width-bar");
          div && setCurrentWidth((30 / div.offsetWidth) * 100);
        },
        time ? time : 0
      );
    };

    useEffect(() => {
      handlerResize();
    }, []);

    useEffect(() => {
      window.addEventListener("resize", () => handlerResize(500));
      return () =>
        window.removeEventListener("resize", () => handlerResize(500));
    }, []);

    return (
      <section className={styles.bar}>
        <section id="width-bar" className={styles.bar_under}>
          <div
            style={{
              marginLeft: `${percent - currentWidth / 2}%`,
              color: color
            }}
          >
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
  }
);
