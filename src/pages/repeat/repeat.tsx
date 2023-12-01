import { useEffect, useState } from "react";
import { RepeatWord } from "../../components/repeat/repeat-word";
import { useAppDispatch, useAppSelector } from "../../redux/reduxUtils";
import { fetchGetWords } from "../../redux/repeatReducer";
import { Loading } from "../../components/all/loading/loading";
import start from "../../assets/images/start.png";

import styles from "./repeat.module.scss";
import { imgAttribute } from "../../utils/functionutils";
import { RepeatHint } from "../../components/repeat/repeat-hint";
import { RepeatSetting } from "../../components/modals/repeat-setting/repeat-setting";

let timeout: ReturnType<typeof setInterval>;
export const Repeat = () => {
  const dispatch = useAppDispatch();
  const { words } = useAppSelector(state => state.repeatReducer);
  const [isStart, setIsStart] = useState<boolean>(true);
  const [isSetting, setIsSetting] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const [isQuestion, setIsQuestion] = useState<boolean>(false);
  const [isTime, setIsTime] = useState<number>(0);

  const handlerNext = () => {
    if (!words[count + 1]) {
      if (isTime && !isStart) clearInterval(timeout);
      return;
    }
    setCount(count + 1);
  };

  const handlerIsQuestion = () => setIsQuestion(!isQuestion);
  const handlerIsSetting = () => setIsSetting(true);

  const handlerAgo = () => {
    if (count === 0) {
      if (isTime && !isStart) clearInterval(timeout);
      return;
    }
    setCount(count - 1);
  };

  const handlerIsStart = () => {
    setIsStart(false);
    dispatch(fetchGetWords());
  };
  useEffect(() => {
    if (isTime && !isStart) {
      timeout = setInterval(() => handlerNext(), isTime * 1000);
    }
    return () => clearInterval(timeout);
  }, [isStart, count, words]);
  return (
    <section className={styles.repeat}>
      {isSetting && (
        <RepeatSetting setIsSetting={setIsSetting} setIsTime={setIsTime} />
      )}
      <section className={styles.repeat_content}>
        <section className={styles.repeat_content_subject}>
          <section className={styles.repeat_content_subject_settings}>
            {isQuestion && <RepeatHint />}
            <img
              onClick={handlerIsQuestion}
              width={40}
              src="https://cdn-icons-png.flaticon.com/512/8154/8154798.png?ga=GA1.1.1191295292.1695892668"
              alt=""
            />
            <img
              onClick={handlerIsSetting}
              width={40}
              src="https://cdn-icons-png.flaticon.com/512/9068/9068643.png?ga=GA1.1.1191295292.1695892668"
              alt=""
            />
          </section>
          <h1>Repeat</h1>
        </section>
        <section className={styles.repeat_content_start}>
          {isStart ? (
            <section className={styles.repeat_content_start_description}>
              <p>
                We recommend that you familiarize yourself with the settings and
                tips before starting.
              </p>
              <img
                {...imgAttribute({
                  src: "https://cdn-icons-png.flaticon.com/512/7968/7968624.png?ga=GA1.1.1191295292.1695892668",
                  alt: "start",
                  role: "start",
                  width: `${90}px`,
                  title: "start"
                })}
                onClick={handlerIsStart}
                className={styles.repeat_content_start_anim}
              />
            </section>
          ) : words.length ? (
            <RepeatWord
              word={words[count].word || ""}
              translate={words[count].translate || ""}
              handlerAgo={handlerAgo}
              handlerNext={handlerNext}
            />
          ) : (
            <Loading width={"300"} />
          )}
        </section>
        <section className={styles.repeat_content_inf}>
          {words.length && !isStart ? (
            <p>
              <span>{count + 1}</span>
              <span>/</span>
              <span>{words?.length}</span>
            </p>
          ) : null}
        </section>
      </section>
    </section>
  );
};
