import React from "react";
import { useActions, useAppSelector } from "../../../Redux/ReduxUtils";
import { slice } from "../../../Redux/ErrorsReducer";
import done from "../../../Assets/Images/done.png";
import error from "../../../Assets/Images/error.png";
import styles from "./hintmodal.module.scss";

export const HintModal = () => {
  const { deleteHint } = useActions(slice.actions);
  const hints = useAppSelector(state => state.errorsReducer.errors);
  const removeHint = (id: string) => deleteHint(id);
  const resultHits = hints.map((item, index) => {
    switch (item.status) {
      case "error":
        return (
          <div
            style={{ top: `${800 - index * 115}px`, color: "#ed4004" }}
            className={styles.hint}
            onClick={() => removeHint(item.id)}
            key={item.id}
          >
            <img src={error} alt={item.article} />
            <div>
              <p>
                {item.message} <span>{item.article}</span>
              </p>
            </div>
          </div>
        );
      case "done":
        return (
          <div
            className={styles.hint}
            style={{ top: `${800 - index * 115}px`, color: "#00f61a" }}
            onClick={() => removeHint(item.id)}
            key={item.id}
          >
            <img src={done} alt={item.article} />
            <div>
              <p>
                {item.message} <span>{item.article}</span>
              </p>
            </div>
          </div>
        );
      case "warn":
        return (
          <div
            className={styles.hint}
            style={{ top: `${800 - index * 115}px`, color: "yellow" }}
            onClick={() => removeHint(item.id)}
            key={item.id}
          >
            <h3>{item.article}</h3>
          </div>
        );
      default:
        return null;
    }
  });

  return <div>{resultHits}</div>;
};
