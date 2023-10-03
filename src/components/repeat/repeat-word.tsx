import { FC, MouseEvent, useEffect, useState } from "react";
import styles from "./repeat-word.module.scss";

type TRepeatWord = {
  word: string;
  translate: string;
  handlerNext: () => void;
  handlerAgo: () => void;
};

export const RepeatWord: FC<TRepeatWord> = ({
  word,
  handlerNext,
  handlerAgo,
  translate
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const handlerFocus = (e: MouseEvent) => {
    e.type === "mouseenter" ? setIsFocus(true) : setIsFocus(false);
  };

  const handleKeyDown = (e:KeyboardEvent) => {
    if (e.key === "ArrowRight") handlerNext();
    if (e.key === "ArrowLeft") handlerAgo();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [word]);

  return (
    <section className={styles.repeatWord}>
      <section className={styles.repeatWord_option}>
        <button onClick={handlerAgo}>{"<"}</button>
      </section>
      <section className={styles.repeatWord_description}>
        <h3>
          <em>Translate this word...</em>
        </h3>
        <p onMouseEnter={handlerFocus} onMouseLeave={handlerFocus}>
          {word}
        </p>
        <span style={{ opacity: isFocus ? "1" : "0" }}>{translate}</span>
      </section>
      <section className={styles.repeatWord_option}>
        <button onClick={handlerNext}>{">"}</button>
      </section>
    </section>
  );
};
