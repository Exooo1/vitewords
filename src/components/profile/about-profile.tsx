import { ProgressBar } from "./progress/progress-bar";
import { LEVEL_ENGLISH } from "../../constants/constants";
import { TLevel } from "../../utils/types/commonTypes";
import styles from "./about-profile.module.scss";
import words from "../../assets/images/words.png";
import notes from "../../assets/images/notes.png";
import days from "../../assets/images/days.png";

const checkLevel = (words: number) => {
  let level = LEVEL_ENGLISH.a0;
  if (words >= LEVEL_ENGLISH.a1.goal) level = LEVEL_ENGLISH.a1;
  if (words >= LEVEL_ENGLISH.a2.goal) level = LEVEL_ENGLISH.a2;
  if (words >= LEVEL_ENGLISH.b1.goal) level = LEVEL_ENGLISH.b1;
  if (words >= LEVEL_ENGLISH.b2.goal) level = LEVEL_ENGLISH.b2;
  if (words >= LEVEL_ENGLISH.c1.goal) level = LEVEL_ENGLISH.c1;
  if (words >= LEVEL_ENGLISH.c2.goal) level = LEVEL_ENGLISH.c2;
  return level;
};

const countWords = (value: TLevel) => {
  const { letter, sup } = value;
  const levels = Object.values(LEVEL_ENGLISH);
  let lvl = 0;
  levels.forEach((el, i) => {
    console.log(el.letter + el.sup === letter + sup);
    if (el.letter + el.sup === letter + sup) {
      if (levels[i + 1]) lvl = levels[i + 1].goal;
      else lvl = el.goal;
    }
  });
  return lvl;
};

const addFile = () => {
  const html = document.createElement("input");
  html.type = "file";
  html.name = "addFile";
  document.body.appendChild(html);
  html.click();
};

export const AboutProfile = () => {
  const count = 300;
  const level = checkLevel(count);
  const end = countWords(level);
  const rest = end - count;
  return (
    <section className={styles.aboutProfile}>
      <section className={styles.aboutProfile_avatar} id={"sectionid"}>
        <figure>
          <img
            onClick={addFile}
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
        <p style={{ paddingLeft: "10px" }}>
          All data on English language levels are taken from the Internet.
        </p>
        <section className={styles.aboutProfile_progress_information}>
          <section className={styles.aboutProfile_progress_information_level}>
            <section>
              <h1 style={{ color: level.color }}>
                {level.letter}
                <sup>{level.sup}</sup>
              </h1>
            </section>
            <section>
              <section>
                <img src={days} alt="days" />
                <p style={{ color: "#ffc403" }}>2d</p>
              </section>
              <section>
                <img src={notes} alt="notes" />
                <p style={{ color: "#ffffff" }}>3</p>
              </section>
              <section>
                <img src={words} alt="words" />
                <p style={{ color: "#03ff03" }}>738</p>
              </section>
            </section>
          </section>
          <section></section>
        </section>
        <section className={styles.aboutProfile_progress_information_bar}>
          <ProgressBar count={count} rest={rest} start={level.goal} end={end} />
        </section>
      </section>
    </section>
  );
};
