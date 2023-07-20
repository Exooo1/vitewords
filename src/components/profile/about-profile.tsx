import styles from "./about-profile.module.scss";
import { ProgressBar } from "./progress/progress-bar";

const checkLevel = (words: number) => {
  const level = { letter: "A", sup: "0" };
  if (words >= 1000) (level.letter = "A"), (level.sup = "1");
  if (words >= 2000) (level.letter = "A"), (level.sup = "2");
  if (words >= 3000) (level.letter = "B"), (level.sup = "1");
  if (words >= 4000) (level.letter = "B"), (level.sup = "2");
  if (words >= 5000) (level.letter = "C"), (level.sup = "1");
  if (words >= 6000) (level.letter = "C"), (level.sup = "2");
  return level;
};

export const AboutProfile = () => {
  const level = checkLevel(1000)
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
              <h1>
                {level.letter}<sup>{level.sup}</sup>
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
