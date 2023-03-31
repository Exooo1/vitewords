import React, { FC } from "react";

import linkedin from "../../Assets/Images/linkedin.png";
import telegram from "../../Assets/Images/telegram.png";
import github from "../../Assets/Images/github.png";

import styles from "./footer.module.scss";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footer_description}>
        <section className={styles.footer_description_links}>
          <ul>
            <li>
              <img src={linkedin} alt="linkedin" />
            </li>
            <li>
              <img src={github} alt="github" />
            </li>
            <li>
              <img src={telegram} alt="telegram" />
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
