import {KeyboardEventHandler, useEffect, useMemo, useState} from "react";
import io from 'socket.io-client';
import {ChatMessage} from "../../Components/chat/message/message";
import chat from '../../assets/Images/headerchat.png'
import send from '../../assets/Images/send.png'

import styles from './chat.module.scss'
import {WrapperMessage} from "../../Components/chat/wrappermessage/wrappermessage";
import {Loading} from "../../Common/CommonComponents/Loading/Loading";

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
        socket.on('welcome',(data)=>{
            console.log(data)
        })
        socket.on("clientMessages", (messages) => {
            setMessages(messages)
        });
        socket.on("clientId", (id) => {
            setClientId(id)
        });
        socket.on("update", (data) => {
            console.log(data)
        });

        return () => {
            socket.on('disconnect', () => {
                console.log('Goodbye!')
            })
        }
    }, []);

    const handlerSend = (e: any) => {
        if (e.key === 'Enter' && text.length >= 1) {
            console.log('Enter')
            socket.emit('message', text)
            setText('')
        }
    }
    useEffect(() => {
        const element = document.getElementById('test');
        if (element) element.scrollTop = element.scrollHeight;
    }, [messages])

    const memoMessages = useMemo(() => {
        return <WrapperMessage messages={messages} clientId={clientId}/>
    }, [messages])

    return <section className={styles.chat}>
        <section className={styles.chat_container}>
            <section className={styles.chat_container_header}>
                <section>
                    <h2>Chat</h2>
                </section>
                <figure>
                    <p>A chat is an online platform that allows users to communicate with each other in real-time.</p>
                    <img src={chat} alt="chat" role='picture'/>
                </figure>
            </section>
            {loading ? <Loading/> : memoMessages}
            <section className={styles.chat_container_send}>
                <input value={text} onChange={(e) => setText(e.target.value)} type="text"
                       disabled={loading}
                       onKeyDown={handlerSend}
                       placeholder='your message...'/>
                {loading?<Loading/>:<img
                    onClick={handlerSend}
                    src={send}
                    alt="send"/>}
            </section>
        </section>
    </section>
}




