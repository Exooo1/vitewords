import styles from './progress-bar.module.scss'

export const ProgressBar = () =>{
    return <section className={styles.bar}>
        <section className={styles.bar_under}>
            <div><h1>300</h1></div>
        </section>
        <section className={styles.bar_information}>
            <p>0</p>
            <p>1000</p>
        </section>
        <section className={styles.bar_line}>
            <div></div>
        </section>
    </section>
}
