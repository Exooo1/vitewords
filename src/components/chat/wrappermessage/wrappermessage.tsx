import React, { memo } from "react";
import { ChatMessage } from "../message/message";

import styles from "./wrapper.module.scss";
import { MessageType } from "../../../redux/profileReducer";
import { uuid } from "../../../utils/functionutils";

type WrapperMessageType = {
  messages: Array<MessageType>;
  clientId: string;
};

export const WrapperMessage: React.FC<WrapperMessageType> = memo(
  ({ messages, clientId }) => {
    return (
      <section id="scroll" className={styles.wrapper}>
        <section className={styles.test}>
          {messages.map(item => (
            <ChatMessage
              key={uuid(item.clientId)}
              align={clientId === item.clientId}
              fullName={item.writer}
              message={item.message}
            />
          ))}
        </section>
      </section>
    );
  }
);
