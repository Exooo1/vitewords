import { ProgressBar } from "./progress/progress-bar";
import { LEVEL_ENGLISH } from "../../constants/constants";
import {useAppDispatch, useAppSelector} from "../../redux/reduxUtils";
import { TLevel } from "../../utils/types/commonTypes";
import styles from "./about-profile.module.scss";
import iwords from "../../assets/images/words.png";
import inotes from "../../assets/images/notes.png";
import idays from "../../assets/images/days.png";
import {fetchSetAvatar} from "../../redux/profileReducer";

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
    if (el.letter + el.sup === letter + sup) {
      if (levels[i + 1]) lvl = levels[i + 1].goal;
      else lvl = el.goal;
    }
  });
  return lvl;
};


export const AboutProfile = () => {
  const {
    profile: { lastName, firstName, days, totalWords, avatar, notes }
  } = useAppSelector(state => state.profileReducer);

  const dispatch = useAppDispatch()
  const level = checkLevel(totalWords);
  const end = countWords(level);
  const rest = end - totalWords;

  const addFile =  () => {
    const html = document.createElement("input");
    html.type = "file";
    html.name = "addFile";
    html.addEventListener( "change", event => {
      const formData = new FormData();
      const files = (event?.target as HTMLInputElement).files;
      let file = null
      if(files){
        file = files[0]
        const newFile = new File([file],firstName+lastName+file.name)
        formData.append('file', newFile);
        if (file) {
          dispatch(fetchSetAvatar(formData))
        }
      }
    });
    document.body.appendChild(html);
    html.click();
    html.remove()
  };

  return (
    <section className={styles.aboutProfile}>
      <section className={styles.aboutProfile_avatar} id={"sectionid"}>
        <figure>
          <img onClick={addFile} src={`http://localhost:8080/profile/get-avatar/${avatar}`} alt="avatar" />
        </figure>
        <section>
          <section>
            <p>
              {lastName} {firstName}
            </p>
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
                <img src={idays} alt="days" />
                <p style={{ color: "#ffc403" }}>{days}d</p>
              </section>
              <section>
                <img src={inotes} alt="notes" />
                <p style={{ color: "#ffffff" }}>{notes}</p>
              </section>
              <section>
                <img src={iwords} alt="words" />
                <p style={{ color: "#03ff03" }}>{totalWords}</p>
              </section>
            </section>
          </section>
          <section></section>
        </section>
        <section className={styles.aboutProfile_progress_information_bar}>
          <ProgressBar
            count={totalWords}
            rest={rest}
            start={level.goal}
            end={end}
            color={level.color}
          />
        </section>
      </section>
    </section>
  );
};
