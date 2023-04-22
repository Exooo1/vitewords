import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import eye from "../../../assets/images/eye.png";
import eye2 from "../../../assets/images/eyep.png";
import mail from "../../../assets/images/email.png";
import styles from "../../../pages/registration/registration.module.scss";

type FormPasswordType = {
  email: string;
  password: string;
  changePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  changeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  login: (e: KeyboardEvent) => void;
};
export const FormPassword: React.FC<FormPasswordType> = memo(
  ({ email, password, changePassword, changeEmail, login }) => {
    const [isVisible, setVisible] = useState<boolean>(false);
    const changeVisible = () => setVisible(!isVisible);
    return (
      <>
        <section className={styles.registration_fill_field}>
          <div>
            <label style={{ visibility: email ? "visible" : "hidden" }}>
              Email
            </label>
            <input
              value={email}
              onChange={changeEmail}
              onKeyDown={login}
              type={"email"}
              placeholder={"Email"}
            />
          </div>
          <img src={mail} alt={email} />
        </section>
        <section className={styles.registration_fill_field}>
          <div>
            <label style={{ visibility: password ? "visible" : "hidden" }}>
              Password
            </label>
            <input
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={changePassword}
              onKeyDown={login}
              placeholder={"Password"}
            />
          </div>
          <img
            onClick={changeVisible}
            src={isVisible ? eye2 : eye}
            alt={password}
          />
        </section>
      </>
    );
  }
);
