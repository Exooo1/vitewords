import { ChangeEvent, FC, useState } from "react";
import "./word.module.scss";
import { useAppDispatch } from "../../../../redux/reduxUtils";
import { fetchChangeWord } from "../../../../redux/wordsReducer";
import styles from "./word.module.scss";
import {
  handlerDeleteHint,
  imgAttribute
} from "../../../../utils/functionutils";
import save from "../../../../assets/images/save.png";
import edit from "../../../../assets/images/edit.png";

type WordType = {
  word: string;
  translate: string;
  description: string;
  added: string;
  deleteWord: () => void;
  id: string;
};
export const Word: FC<WordType> = ({
  id,
  word,
  description,
  deleteWord,
  added,
  translate
}) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [wor, setWor] = useState<string>(word);
  const [tran, setTran] = useState<string>(translate);
  const [descrip, setDescrip] = useState<string>(description);

  const handlerState =
    (state: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      state(e.target.value);
    };

  const acceptChange = () => {
    if (isEdit) {
      setIsEdit(false);
      if (descrip === description && tran === translate && wor === word) return;
      if (wor && tran) {
        dispatch(
          fetchChangeWord({
            word: wor,
            id,
            translate: tran,
            description: descrip,
            added
          })
        );
      } else
        handlerDeleteHint("The word should not be empty ", dispatch, "error");
    } else setIsEdit(true);
  };
  return (
    <section className={styles.word} key={word}>
      {isEdit ? (
        <section className={styles.word_description}>
          <input
            autoFocus={true}
            type="text"
            value={wor}
            onChange={handlerState(setWor)}
          />
          <input type="text" value={tran} onChange={handlerState(setTran)} />
          <input
            type="text"
            value={descrip || "your description"}
            onChange={handlerState(setDescrip)}
          />
        </section>
      ) : (
        <section className={styles.word_description}>
          <p>{word}</p>
          <p>{translate}</p>
          <p style={{ color: description ? "#03ff03" : "#525461" }}>
            {description || "empty"}
          </p>
        </section>
      )}
      <section className={styles.word_management}>
        <p>{added}</p>
        <img
          {...imgAttribute({
            src: isEdit ? save : edit,
            alt: "edit",
            role: "edit",
            width: "35px",
            title: "edit"
          })}
          onClick={acceptChange}
        />
        <button onClick={deleteWord}>X</button>
      </section>
    </section>
  );
};
