import { FC, useState } from "react";
import styles from "./hintmodal.module.scss";

type THint = {
  removeHint: () => void;
  imgStatus: string;
  message: string;
  article: string;
  status:string
};

export const Hint: FC<THint> = ({
  removeHint,
  imgStatus,
  article,
  message,
  status,
}) => {
  const [isRemoved, setIsRemoved] = useState(false);
  const handlerDelete = () => {
    setIsRemoved(true);
    removeHint();
  };

  let color:string;

  switch (status){
    case 'error':
      color = '#ed4004'
      break;
    case 'done':
      color = '#00f61a'
      break;
    case 'warn':
      color = 'yellow'
      break;
    default:  color = 'white'
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
