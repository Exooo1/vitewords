import styles from "./about-profile.module.scss";
import { ProgressBar } from "./progress/progress-bar";
import { LEVEL_ENGLISH } from "../../constants/constants";

const checkLevel = (words: number) => {
  let level = LEVEL_ENGLISH.a0;
  if (words >= 1000) level = LEVEL_ENGLISH.a1;
  if (words >= 2000) level = LEVEL_ENGLISH.a2;
  if (words >= 3000) level = LEVEL_ENGLISH.b1;
  if (words >= 4000) level = LEVEL_ENGLISH.b2;
  if (words >= 5000) level = LEVEL_ENGLISH.c1;
  if (words >= 6000) level = LEVEL_ENGLISH.c2;
  return level;
};

export const AboutProfile = () => {
  const level = checkLevel(9000);
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
            <section style={{ background: level.color, boxShadow:`0 0 5px black` }}>
              <h1>
                {level.letter}
                <sup>{level.sup}</sup>
              </h1>
            </section>
            <section>
              <h1>hello</h1>
            </section>
          </section>
          <section></section>
        </section>
        <section className={styles.aboutProfile_progress_information_bar}>
          <ProgressBar />
        </section>
      </section>
    </section>
  );
};
