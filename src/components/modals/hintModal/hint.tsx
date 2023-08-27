import React, { FC, useState } from "react";
import done from "../../../assets/images/done.png";
import error from "../../../assets/images/error.png";
import styles from "./hintmodal.module.scss";

type THint = {
  removeHint: () => void;
  message: string;
  article: string;
  status: string;
};

export const Hint: FC<THint> = ({ removeHint, article, message, status }) => {
  const [isRemoved, setIsRemoved] = useState(false);
  const handlerDelete = () => {
    setIsRemoved(true);
    removeHint();
  };

  let color: string;
  let imgStatus = done;

  switch (status) {
    case "error":
      color = "#ed4004";
      imgStatus = error;
      break;
    case "done":
      color = "#00f61a";
      imgStatus = done;
      break;
    case "warn":
      color = "yellow";
      break;
    default:
      color = "white";
  }

  return (
    <section
      style={{
        color,
        transform: isRemoved ? "translate(-300px)" : ""
      }}
      className={styles.hints_item}
      onClick={handlerDelete}
    >
      <img src={imgStatus} alt={"status"} role="hint-picture" title="hint" />
      <div>
        <p>
          {message} <span>{article}</span>
        </p>
      </div>
    </section>
  );
};
