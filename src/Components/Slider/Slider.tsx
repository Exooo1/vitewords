import React, {useEffect, useState} from "react";

import styles from "./slider.module.scss";
import {SLIDER_BANNERS} from "../../constants/constants";

export const Slider = () => {
  const [count, setCount] = useState<number>(0);
  const [slider, setSlider] = useState(SLIDER_BANNERS);
  const changeCount = (id: number) => setCount(id);
  useEffect(() => {
    const interval = setInterval(() => {
      if (count < slider.length - 1) {
        setCount(count + 1);
        setSlider(
          slider.map(item =>
            item.id === count
              ? { ...item, focus: true }
              : { ...item, focus: false }
          )
        );
      } else setCount(0);
    }, 5000);
    return () => clearInterval(interval);
  }, [count]);

  const switchers = slider.map(item => (
    <button
      disabled={item.id === count}
      onClick={() => changeCount(item.id)}
      className={item.id === count ? styles.switchers_isActive : ""}
      key={item.id}
    ></button>
  ));

  return (
    <section className={styles.slider}>
      <article>
        <img src={slider[count].img} alt="pictures" />
        <section className={styles.slider_description}>
          <dl>
            <dt>{slider[count].title}</dt>
            <dd>{slider[count].description}</dd>
          </dl>
        </section>
      </article>
      <section className={styles.slider_switchers}>{switchers}</section>
    </section>
  );
};
