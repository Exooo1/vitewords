import chat from '../../assets/Images/headerchat.png'
import styles from './chat.module.scss'
import {ChatMessage} from "../../Components/chat/message/message";

export const Chat = () => {
    return <section className={styles.chat}>
        <section className={styles.chat_container}>
            <section className={styles.chat_container_header}>
                <section>
                    <h2>Chat</h2>
                </section>
                <figure>
                    <p>A chat is an online platform that allows users to communicate with each other in real-time. It
                        provides a means for people to exchange text, audio.</p>
                    <img src={chat} alt="chat" role='picture'/>
                </figure>
            </section>
            <section className={styles.chat_container_main}>
                <ChatMessage/>
                <ChatMessage/>
                <ChatMessage/>
                <ChatMessage/>
                <ChatMessage/>
                <ChatMessage/>
                <ChatMessage/>
                <ChatMessage/>
                <ChatMessage/>
            </section>
            <section className={styles.chat_container_send}>
                <input type="text" placeholder='your message...'/>
                <img
                    src="https://www.iconbunny.com/icons/media/catalog/product/6/0/602.10-send-message-icon-iconbunny.jpg"
                    alt="send"/>
            </section>
        </section>
    </section>
}

