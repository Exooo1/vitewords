import React, { ChangeEvent, FC, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./repeat-setting.module.scss";

type TRepeatSetting = {
  setIsSetting: (value: boolean) => void;
  setIsTime: (value: number) => void;
};

export const RepeatSetting: FC<TRepeatSetting> = ({
  setIsSetting,
  setIsTime
}) => {
  const [time, setTime] = useState<number>(0);
  const handlerCloseModal = () => setIsSetting(false);
  const handlerSetTime = (second: ChangeEvent<HTMLInputElement>) =>
    setTime(+second.target.value);
  const handlerSetSettings = () => {
    setIsTime(time);
    setIsSetting(false);
  };

  return createPortal(
    <section className={styles.repeatSetting} onClick={handlerCloseModal}>
      <section
        className={styles.repeatSetting_setting}
        onClick={e => e.stopPropagation()}
      >
        <h2>Settings</h2>
        <section className={styles.repeatSetting_setting_options}>
          <section className={styles.repeatSetting_setting_options_time}>
            <section>
              <p>You can set up automatic word switching.</p>
              <input
                type="range"
                value={time}
                max={10}
                step={1}
                onChange={handlerSetTime}
              />
            </section>
            <p>{time}s</p>
          </section>
          <section className={styles.repeatSetting_setting_options_filters}>
            <section>
              <p>Replace word {">"} translate</p>
            </section>
            <section>
              <p>Reverse</p>
            </section>
            <section>
              <p>Mix</p>
            </section>
            <section
              className={styles.repeatSetting_setting_options_filters_letter}
            >
              <p>Set Letter</p>
              <input maxLength={1} type="text" />
            </section>
            <section>5</section>
            <section>6</section>
          </section>
          <button onClick={handlerSetSettings}>Accept</button>
        </section>
      </section>
    </section>,
    document.body
  );
};
