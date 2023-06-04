import { FC } from "react";

import linkedin from "../../assets/images/linkedin.png";
import telegram from "../../assets/images/telegram.png";
import github from "../../assets/images/github.png";

import styles from "./footer.module.scss";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footer_description}>
        <section className={styles.footer_description_links}>
          <ul>
            <li>
              <img
                src={linkedin}
                alt="linkedin"
                role="link-picture"
                title="linkedin"
              />
            </li>
            <li>
              <img
                src={github}
                alt="github"
                role="link-picture"
                title="github"
              />
            </li>
            <li>
              <img
                src={telegram}
                alt="telegram"
                role="link-picture"
                title="telegram"
              />
            </li>
          </ul>
        </section>
        <section className={styles.footer_description_cite}>
          <cite>Vlas Maskalenchik 2023. All rights reserved.</cite>
        </section>
      </section>
    </footer>
  );
};
