import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeTitle, imgAttribute } from "../../../utils/functionutils";

import notfound from "../../../assets/images/notfound.png";

import styles from "./notfound.module.scss";

export const NotFound: FC = () => {
  const [time, setTime] = useState(5);
  const redirect = useNavigate();
  if (time === 0) redirect("auth");

  useEffect(() => {
    changeTitle("Not Found");
    const intervalTime = setInterval(() => {
      setTime(time => time - 1);
    }, 1000);
    return () => clearInterval(intervalTime);
  }, [time]);

  return (
    <section className={styles.notFound}>
      <figure className={styles.notFound_image}>
        <img
          {...imgAttribute({
            src: notfound,
            alt: "notfound",
            role: "notfound",
            width: "50%",
            title: "notfound"
          })}
        />
        <h2>
          Oops! We are sorry, but the page you are looking for cannot be found{" "}
          <span>.</span>
        </h2>
      </figure>
      <p>
        You will be redirected to the homepage in <time>{time} minutes.</time>
      </p>
    </section>
  );
};
