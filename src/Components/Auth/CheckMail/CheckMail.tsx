import React, { useEffect } from "react";
import { changeTitle } from "../../../Common/usefulFuncs";
import styles from "./checkmail.module.scss";
import mail from "../../../Assets/Images/mail.png";

export const CheckMail = () => {
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
