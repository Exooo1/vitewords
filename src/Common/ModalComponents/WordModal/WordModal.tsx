import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../Redux/ReduxUtils";
import { fetchAddWord } from "../../../Redux/WordsReducer";
import "./wordModal.scss";

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
    <div className="container_modalWord" onClick={handlerIsModal}>
      <div onClick={e => e.stopPropagation()}>
        <h2>Add new Word</h2>
        <div className={hint === "word" ? "modalWord_requiredfield" : ""}>
          {word && <label>Word</label>}
          <input
            autoFocus={true}
            type="text"
            placeholder={"Word"}
            value={word}
            onChange={handlerWord}
            onKeyDown={handlerEnter}
          />
        </div>
        <div className={hint === "translate" ? "modalWord_requiredfield" : ""}>
          {translate && <label>Translate</label>}
          <input
            type="text"
            placeholder={"Translate"}
            value={translate}
            onChange={handlerTranslate}
            onKeyDown={handlerEnter}
          />
        </div>
        <div>
          {description && <label>Description</label>}
          <input
            type="text"
            placeholder={"Description"}
            value={description}
            onChange={handlerDescription}
            onKeyDown={handlerEnter}
          />
        </div>
        <div className="container_modalWord_buttons">
          <button onClick={handlerAddNewWord}>Add</button>
          <button onClick={handlerIsModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
