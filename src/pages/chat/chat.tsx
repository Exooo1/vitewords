import { ChangeEvent, useEffect, useState } from "react";
import { WrapperMessage } from "../../Components/chat/wrappermessage/wrappermessage";
import { Loading } from "../../Common/CommonComponents/Loading/Loading";
import io, { Socket } from "socket.io-client";

import imgChat from "../../assets/Images/headerchat.png";
import send from "../../assets/Images/send.png";
import styles from "./chat.module.scss";
import { fetchGetProfile, MessageType } from "../../redux/ProfileReducer";
import { useAppDispatch, useAppSelector } from "../../redux/ReduxUtils";
import { changeTitle, uuid } from "../../Common/usefulFuncs";

type WriterType = {
  lastName: string;
  socketID: string;
};

export const Chat = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [writers, setWriters] = useState<Array<WriterType>>([]);
  const [users, setUsers] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { firstName, lastName, email, chat } = useAppSelector(
    state => state.profileReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    changeTitle("chat");
    dispatch(fetchGetProfile());
  }, []);

  useEffect(() => {
    setMessages(chat);
  }, [chat]);

  useEffect(() => {
    const element = document.getElementById("scroll");
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const socket = io("http://localhost:8999");
    setSocket(socket);
    socket.on("connect", () => {
      setLoading(false);
    });
    socket.on("writers", setWriters);
    socket.on("incUsers", setUsers);
    socket.on("decrUsers", setUsers);
    socket.on("clientMessages", setMessages);
    return () => {
      socket.disconnect();
    };
  }, []);

  const handlerText = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 1)
      socket?.emit("writer", { lastName, socketID: email });
    if (e.target.value.length === 0)
      socket?.emit("cleanWriter", { lastName, socketID: email });
    setText(e.target.value);
  };

  const handlerSend = (e: any) => {
    if (e.key === "Enter" && text.length >= 1) {
      setMessages([
        ...messages,
        {
          _id: email,
          clientId: email,
          writer: `${firstName} ${lastName}`,
          message: text
        }
      ]);
      socket?.emit("message", {
        text,
        writer: `${firstName} ${lastName}`,
        email
      });
      setText("");
    }
  };

  const handlerConnDisc = (type: string) => {
    if (type === "connect") {
      socket?.connect();
      setLoading(false);
    }
    if (type === "disconnect") {
      socket?.close();
      setLoading(true);
    }
  };

  const resWriters = writers.map(item => (
    <p key={uuid(item.socketID)}>{item.lastName}</p>
  ));

  return (
    <section className={styles.chat}>
      <section className={styles.chat_container}>
        <section className={styles.chat_container_messages}>
          {loading ? (
            <Loading width={"450"} />
          ) : (
            <>
              <WrapperMessage messages={messages} clientId={email} />
              <section className={styles.chat_container_messages_writers}>
                <section>{resWriters}</section>
                {writers.length ? (
                  <p style={{ paddingLeft: "8px", color: "darkgray" }}>
                    prints a message...
                  </p>
                ) : null}
              </section>
            </>
          )}
          <section className={styles.chat_container_send}>
            <input
              value={text}
              onChange={handlerText}
              type="text"
              disabled={loading}
              onKeyDown={handlerSend}
              placeholder="your message..."
            />
            <img onClick={handlerSend} src={send} alt="send" />
          </section>
        </section>
        <section className={styles.chat_container_header}>
          <section className={styles.chat_container_header_description}>
            <h2>Chat</h2>
            <img src={imgChat} alt="chat" role="picture" />
          </section>
          <figure>
            <p>
              A chat is an online platform that allows users to communicate with
              each other in real-time. To communicate with each other in
              real-time
            </p>
          </figure>
          <section className={styles.chat_container_header_information}>
            <section className={styles.chat_container_header_information_head}>
              {/*<img src={chats} alt="chats" role="picture" />*/}
              <h3>Information about common chat and group.</h3>
            </section>
            <section
              className={styles.chat_container_header_information_common}
            >
              <h4>Common Chat</h4>
              <section
                className={styles.chat_container_header_information_container}
              >
                <section>
                  {loading ? (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3088/3088765.png"
                      alt=""
                    />
                  ) : (
                    <p>Online</p>
                  )}
                  {loading ? null : <strong>{users}</strong>}
                </section>
                <section>
                  <p>You can disconnect and connect at any time!</p>
                  <div>
                    <button
                      onClick={() => handlerConnDisc("connect")}
                      disabled={!loading}
                    >
                      join
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => handlerConnDisc("disconnect")}
                    >
                      leave
                    </button>
                  </div>
                </section>
              </section>
            </section>
            <section
              className={styles.chat_container_header_information_group}
            ></section>
          </section>
        </section>
      </section>
    </section>
  );
};
