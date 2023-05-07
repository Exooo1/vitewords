import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useState
} from "react";
import { WrapperMessage } from "../../components/chat/wrappermessage/wrappermessage";
import { Loading } from "../../components/all/loading/loading";
import io, { Socket } from "socket.io-client";

import imgChat from "../../assets/images/headerchat.png";
import send from "../../assets/images/send.png";
import aboutChat from "../../assets/images/aboutchat.png";
import styles from "./chat.module.scss";
import { fetchGetProfile, MessageType } from "../../redux/profileReducer";
import { useAppDispatch, useAppSelector } from "../../redux/reduxUtils";
import { changeTitle, uuid } from "../../utils/functionutils";
import mp3 from "../../assets/notification.mp3";
import axios from "axios";

type WriterType = {
  lastName: string;
  socketID: string;
};

export const Chat: FC = () => {
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
  const audio = new Audio(mp3);

  useEffect(() => {
    changeTitle("chat");
    dispatch(fetchGetProfile());
  }, []);

  useEffect(() => {
    const mail = window.localStorage.getItem("email");
    if (!mail) window.localStorage.setItem("email", email);
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
    socket.on("clientMessages", message => {
      audio.play();
      setMessages(message);
    });
    return () => {
      disconnectWriter();
      socket.disconnect();
    };
  }, []);

  const disconnectWriter = async () => {
    const email = window.localStorage.getItem("email");
    await axios.post(`http://localhost:8999/disconnect`, { email });
  };

  const handlerText = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0)
      socket?.emit("cleanWriter", { lastName, socketID: email });
    setText(e.target.value);
    if (
      e.target.value.length <= 1 &&
      !writers.some(item => item.socketID === email)
    ) {
      console.log(e.target.value.length);
      socket?.emit("writer", { lastName, socketID: email });
    }
  };

  const handlerSend = (e: KeyboardEvent) => {
    if (e.key === "Enter" && text.length >= 1) {
      // setMessages([
      //   ...messages,
      //   {
      //     _id: email,
      //     clientId: email,
      //     writer: `${firstName} ${lastName}`,
      //     message: text
      //   }
      // ]);
      socket?.emit("message", {
        text,
        writer: `${firstName} ${lastName}`,
        email
      });
      setText("");
    }
  };

  const handlerSendClick = () => {
    if (text.length >= 1) {
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

  const resWriters = writers.map((item, index) => {
    return (
      <p key={uuid(item.socketID)}>
        {item.lastName}
        {writers.length === index + 1 ? null : ","}
      </p>
    );
  });

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
            <img
              onClick={handlerSendClick}
              src={send}
              alt="send"
              role="send-message"
            />
          </section>
        </section>
        <section className={styles.chat_container_header}>
          <section className={styles.chat_container_header_description}>
            <h2>Chat</h2>
            <img src={imgChat} alt="chat" role="picture" title="chats" />
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
              <img
                src={aboutChat}
                alt="chats"
                role="picture"
                title="about-chat"
              />
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
