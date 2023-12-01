import styles from './repeat-hint.module.scss'

export const RepeatHint = () =>{
    return <section className={styles.repeatHint}>
        <ul>
            <li>You can switch words by clicking on the arrows.</li>
            <li>Hover over a word to find out the translation.</li>
        </ul>
    </section>
}
