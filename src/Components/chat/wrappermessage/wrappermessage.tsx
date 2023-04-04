import React, {memo} from 'react'
import {ChatMessage} from "../message/message";

import styles from "./wrapper.module.scss";
import {MessagesType} from "../../../pages/chat/chat";

type WrapperMessageType = {
    messages: Array<MessagesType>
    clientId: string
}

export const WrapperMessage: React.FC<WrapperMessageType> = memo(({messages, clientId}) => {
    return <section id={'test'} className={styles.wrapper}>
        <section className={styles.test}>
            {messages.map(item => <ChatMessage key={(Math.random() * messages.length).toString(34)}
                                               align={clientId === item.clientId} message={item.message}/>)}
        </section>
    </section>
})
