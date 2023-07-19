import styles from "./about-profile.module.scss";

export const AboutProfile = () => {
  return (
    <section className={styles.aboutProfile}>
      <section className={styles.aboutProfile_avatar}>
        <figure>
          <img
            src="https://i.pinimg.com/originals/60/51/fe/6051fead40d8bc60e101fe2932a07bc0.png"
            alt="avatar"
          />
        </figure>
        <section>
          <section>
            <p>Maskalenchik V.</p>
            <p>RU</p>
          </section>
        </section>
      </section>
      <section className={styles.aboutProfile_progress}>
        <h2>Your Progress</h2>
        <p>All data on English language levels are taken from the Internet.</p>
        <section className={styles.aboutProfile_progress_information}>
           <section className={styles.aboutProfile_progress_information_level}>
             <section>
                <h1>A<sup>0</sup></h1>
             </section>
           </section>
           <section></section>
        </section>
      </section>
    </section>
  );
};
