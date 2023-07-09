import { FC, useEffect, useState } from "react";
import { useActions, useAppSelector } from "../../../redux/reduxUtils";
import { HintsType, slice } from "../../../redux/errorsReducer";
import done from "../../../assets/images/done.png";
import error from "../../../assets/images/error.png";
import styles from "./hintmodal.module.scss";

type TIsRemoved = {
  isRemoved?: boolean;
};

export const HintModal: FC = () => {
  const { deleteHint } = useActions(slice.actions);
  const hints = useAppSelector(state => state.errorsReducer.errors);
  const [test, setTest] = useState<Array<HintsType & TIsRemoved>>([]);
  useEffect(() => {
    setTest(hints);
  }, [hints]);
  const removeHint = (id: string) => {
    setTest(
      test.map(item => (item.id === id ? { ...item, isRemoved: true } : item))
    );
    setTimeout(() => {
      deleteHint(id);
    }, 700);
  };
  const resultHits = test.map((item, index) => {
    switch (item.status) {
      case "error":
        return (
          <div
            style={{
              color: "#ed4004",
              transform: item.isRemoved ? "translate(-300px)" : ""
            }}
            className={styles.hints_item}
            onClick={() => removeHint(item.id)}
            key={item.id}
          >
            <img
              src={error}
              alt={item.article}
              role="hint-picture"
              title="hint"
            />
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
            className={styles.hints_item}
            style={{
              color: "#00f61a",
              transform: item.isRemoved ? "translate(-300px)" : ""
            }}
            onClick={() => removeHint(item.id)}
            key={item.id}
          >
            <img
              src={done}
              alt={item.article}
              role="hint-picture"
              title="hint"
            />
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
            className={styles.hints_item}
            style={{
              color: "yellow",
              transform: item.isRemoved ? "translate(-300px)" : ""
            }}
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

  return <div className={styles.hints}>{resultHits}</div>;
};
