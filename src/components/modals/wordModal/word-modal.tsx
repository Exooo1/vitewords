import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../redux/reduxUtils";
import { fetchAddWord } from "../../../redux/wordsReducer";
import styles from "./wordModal.module.scss";

type WordModalType = {
  handlerIsModal: () => void;
};

export const WordModal: React.FC<WordModalType> = ({ handlerIsModal }) => {
  const dispatch = useAppDispatch();
  const [word, setWord] = useState<string>("");
  const [translate, setTranslate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [hint, setHint] = useState<string>("");
  const handlerWord = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };
  const handlerTranslate = (e: ChangeEvent<HTMLInputElement>) => {
    setTranslate(e.target.value);
  };
  const handlerDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handlerAddNewWord = () => {
    if (word.length < 1) {
      setHint("word");
      return;
    }
    if (translate.length < 1) {
      setHint("translate");
      return;
    }
    const wordTrim = word.trim();
    const translateTrim = translate.trim();
    const descriptionTrim = description.trim();
    const date = new Date();
    const added = `${date.toDateString()} ${date.toTimeString().split(" ")[0]}`;
    dispatch(
      fetchAddWord({
        word: wordTrim,
        translate: translateTrim,
        description: descriptionTrim,
        added
      })
    );
    handlerIsModal();
  };
  const handlerEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handlerAddNewWord();
    }
  };
  return (
    <section className={styles.container_modalWord} onClick={handlerIsModal}>
      <section onClick={e => e.stopPropagation()}>
        <h2>New word</h2>
        <section className={hint === "word" ? "modalWord_requiredfield" : ""}>
          {word && <label>Word</label>}
          <input
            autoFocus={true}
            type="text"
            placeholder={"Word"}
            value={word}
            onChange={handlerWord}
            onKeyDown={handlerEnter}
          />
        </section>
        <section
          className={hint === "translate" ? "modalWord_requiredfield" : ""}
        >
          {translate && <label>Translate</label>}
          <input
            type="text"
            placeholder={"Translate"}
            value={translate}
            onChange={handlerTranslate}
            onKeyDown={handlerEnter}
          />
        </section>
        <section>
          {description && <label>Description</label>}
          <input
            type="text"
            placeholder={"Description"}
            value={description}
            onChange={handlerDescription}
            onKeyDown={handlerEnter}
          />
        </section>
        <section className={styles.container_modalWord_buttons}>
          <button onClick={handlerAddNewWord}>Add</button>
          <button onClick={handlerIsModal}>Cancel</button>
        </section>
      </section>
    </section>
  );
};
