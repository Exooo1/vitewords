import {useEffect, useMemo, useState} from "react";
import {WrapperMessage} from "../../Components/chat/wrappermessage/wrappermessage";
import {Loading} from "../../Common/CommonComponents/Loading/Loading";
import io from 'socket.io-client';

import chat from '../../assets/Images/headerchat.png'
import send from '../../assets/Images/send.png'
import chats from '../../assets/Images/chats.png'
import styles from './chat.module.scss'

export type MessagesType = {
    message: string
    clientId: string
}

export const Chat = () => {
    const [socket, setSocket] = useState<any>(null)
    const [text, setText] = useState<string>('')
    const [messages, setMessages] = useState<Array<MessagesType>>([])
    const [clientId, setClientId] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const socket = io('http://localhost:8999')
        setSocket(socket)
        socket.on('connect', () => {
            setLoading(false)
        })
        socket.on("clientMessages", (messages) => {
            setMessages(messages)
        });
        socket.on("clientId", (id) => {
            setClientId(id)
        });
        return () => {
            socket.on('disconnect', () => {
                console.log('Goodbye!')
            })
        }
    }, []);

    const handlerSend = (e: any) => {
        if (e.key === 'Enter' && text.length >= 1) {
            socket.emit('message', text)
            setText('')
        }
    }
    useEffect(() => {
        const element = document.getElementById('scroll');
        if (element) element.scrollTop = element.scrollHeight;
    }, [messages])

    const memoMessages = useMemo(() => {
        return <WrapperMessage messages={messages} clientId={clientId}/>
    }, [messages])

    return <section className={styles.chat}>
        <section className={styles.chat_container}>
            <section className={styles.chat_container_messages}>
                {loading ? <Loading/> : memoMessages}
                <section className={styles.chat_container_send}>
                    <input value={text} onChange={(e) => setText(e.target.value)} type="text"
                           disabled={loading}
                           onKeyDown={handlerSend}
                           placeholder='your message...'/>
                    {loading ? <Loading/> : <img
                        onClick={handlerSend}
                        src={send}
                        alt="send"/>}
                </section>
            </section>
            <section className={styles.chat_container_header}>
                <section className={styles.chat_container_header_description}>
                    <h2>Chat</h2>
                    <img src={chat} alt="chat" role='picture'/>
                </section>
                <figure>
                    <p>A chat is an online platform that allows users to communicate with each other in real-time.
                        To communicate with each other in real-time</p>
                </figure>
                <section className={styles.chat_container_header_information}>
                    <section className={styles.chat_container_header_information_head}>
                        <img src={chats} alt="chats" role='picture'/>
                        <h3>Information about common chat and group.</h3>
                    </section>
                    <section className={styles.chat_container_header_information_common}>
                        <h4>Common Chat</h4>
                        <section className={styles.chat_container_header_information_container}>
                            <section>
                                <p>Online users: 5</p>
                            </section>
                        </section>
                    </section>
                    <section className={styles.chat_container_header_information_group}>
                        <Main/>
                    </section>
                </section>
            </section>
        </section>
    </section>
}

let inputtt = ''
const Main = () => {
    const func = (e:any) => {
        inputtt = e.target.value
    }
    return <div>
        <input onChange={func} type="text"/>
        <button onClick={()=>{
        console.log(inputtt)}
        }>save</button>
    </div>
}

