import styles from "./status.module.scss";
import { ChangeEvent, FC, FocusEvent, useState } from "react";
import { COMMON_EMOJI, STATUS_CHOICES } from "../../../constants/constants";

type TStatusModal = {
  closeNewPost: () => void;
  emoji: string;
  status: string;
  setStatus: (text: string, emoji: string) => void;
};

export const StatusModal: FC<TStatusModal> = ({
  closeNewPost,
  emoji,
  status,
  setStatus
}) => {
  const [isFocus, setFocus] = useState<boolean>(false);
  const [text, setText] = useState<string>(status);
  const [code, setCode] = useState<string>(emoji);
  const [isEmojiCommon, setIsEmojiCommon] = useState<boolean>(false);

  const handlerIsFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.type === "focus" ? setFocus(true) : setFocus(false);
  };
  const handlerStatus = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);
  const handlerChoice = (value: string | null, code: string) => {
    if (value) setText(value);
    setCode(code);
  };
  const handlerSetStatus = () => setStatus(text, code);

  const handlerCancelStatus = () => {
    setText("");
    setCode("&#129504;");
  };
  const handlersIsEmojiCommon = () => {
    setIsEmojiCommon(true);
    setFocus(true);
  };

  return (
    <div className={styles.status}>
      <section className={styles.status_content}>
        <section className={styles.status_content_edit}>
          <h4>Edit status</h4>
          <button onClick={closeNewPost}>x</button>
        </section>
        <section className={styles.status_content_newStatus}>
          <section onClick={handlersIsEmojiCommon}>
            <p dangerouslySetInnerHTML={{ __html: code }}></p>
          </section>
          <input
            onChange={handlerStatus}
            value={text}
            onBlur={handlerIsFocus}
            onFocus={handlerIsFocus}
            type="text"
            placeholder="What's happening?"
          />
        </section>
        <section
          className={`${styles.status_content_suggestions} ${
            isFocus ? styles.status_content__suggestionsFocus : ""
          }`}
        >
          <h4>Suggestions:</h4>
          <section className={styles.status_content_suggestions_choices}>
            {isEmojiCommon
              ? COMMON_EMOJI.map(el => (
                  <section>
                    <p
                      onClick={() => handlerChoice(null, el.code)}
                      dangerouslySetInnerHTML={{ __html: el.code }}
                      style={{fontSize:'20px'}}
                    ></p>
                  </section>
                ))
              : STATUS_CHOICES.map(el => (
                  <section>
                    <p dangerouslySetInnerHTML={{ __html: el.code }}></p>
                    <p onClick={() => handlerChoice(el.name, el.code)}>
                      {el.name}
                    </p>
                  </section>
                ))}
          </section>
        </section>
        <section className={styles.status_content_buttons}>
          <section>
            <button onClick={handlerSetStatus}>Set status</button>
            <button onClick={handlerCancelStatus}>Clear status</button>
          </section>
        </section>
      </section>
    </div>
  );
};
