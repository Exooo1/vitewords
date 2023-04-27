import React, { FC, useEffect } from "react";
import { changeTitle } from "../../utils/functionutils";
import styles from "./checkmail.module.scss";
import mail from "../../assets/images/mail.png";

export const AuthenticationEmail: FC = () => {
  useEffect(() => {
    changeTitle("Email");
  }, []);
  return (
    <section className={styles.checkMail}>
      <figure>
        <h2>YourVocabulary</h2>
        <img src={mail} alt="checkMail" />
        <h3>Check your Email</h3>
        <p>
          We have sent an Email with instructions to example
          <span>@Gmail.com</span>
        </p>
        <p>
          if you do not confirm registration, your account will be deleted after
          12 hours
        </p>
      </figure>
    </section>
  );
};
