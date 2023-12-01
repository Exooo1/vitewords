import { FC } from "react";
import avatar from "../../../assets/images/avatar.jpg";
import styles from "./message.module.scss";
import { imgAttribute } from "../../../utils/functionutils";
import notfound from "../../../assets/images/notfound.png";

type ChatMessageType = {
  message: string;
  align: boolean;
  fullName: string;
};

export const ChatMessage: FC<ChatMessageType> = ({
  message,
  align,
  fullName
}) => {
  return (
    <section className={styles.message} key={message + align}>
      <section
        className={`${styles.message_container} ${
          align ? styles.message_container_isActive : ""
        }`}
      >
        <section>
          <img
            {...imgAttribute({
              src: avatar,
              alt: "avatar",
              role: "avatar",
              width: "40px",
              title: "avatar"
            })}
          />
        </section>
        <section className={styles.message_container_content}>
          <p>{fullName}</p>
          <p>{message}</p>
        </section>
      </section>
    </section>
  );
};
