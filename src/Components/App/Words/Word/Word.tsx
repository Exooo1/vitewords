import React, {ChangeEvent, useState} from "react";
import "./word.module.scss";
import {useAppDispatch} from "../../../../redux/ReduxUtils";
import {fetchChangeWord} from "../../../../redux/WordsReducer";
import styles from './word.module.scss'

type WordType = {
    word: string;
    translate: string;
    description: string;
    added: string;
    deleteWord: () => void;
    id: string;
};
export const Word: React.FC<WordType> = ({
                                             id,
                                             word,
                                             description,
                                             deleteWord,
                                             added,
                                             translate
                                         }) => {
    const dispatch = useAppDispatch();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [wor, setWor] = useState<string>(word);
    const [tran, setTran] = useState<string>(translate);
    const [descrip, setDescrip] = useState<string>(description);
    const handlerWord = (e: ChangeEvent<HTMLInputElement>) => {
        if (wor.length > 1) setWor(e.target.value);
    };

    const acceptChange = () => {
        if (isEdit) {
            setIsEdit(false);
            if (descrip === description && tran === translate && wor === word) return;
            dispatch(
                fetchChangeWord({
                    word: wor,
                    id,
                    translate: tran,
                    description: descrip,
                    added
                })
            );
        } else setIsEdit(true)
    };
    return (
        <section className={styles.word} key={word}>
            {isEdit ? <section className={styles.word_description}>
                <input autoFocus={true} type="text" value={wor} onChange={handlerWord}/>
                <input
                    type="text"
                    value={tran}
                    onChange={e => setTran(e.target.value)}
                />
                <input
                    type="text"
                    value={descrip || "your description"}
                    onChange={e => setDescrip(e.target.value)}
                />
            </section> : <section className={styles.word_description}>
                <p>{word}</p>
                <p>{translate}</p>
                <p style={{color:description?'#03ff03':'#525461'}}>{description || "empty"}</p>
            </section>}
            <section className={styles.word_management}>
                <p>{added}</p>
                <img
                    role='just picture'
                    onClick={acceptChange}
                    src={isEdit ? "https://cdn-icons-png.flaticon.com/512/2258/2258597.png" :
                        'https://cdn-icons-png.flaticon.com/512/2356/2356811.png'}
                    alt="picture"
                />
                <button onClick={deleteWord}>X</button>
            </section>
        </section>
    )
};
