import React, { ChangeEvent, memo, useState } from "react";
import eye from "../../../assets/Images/eye.png";
import eye2 from "../../../assets/Images/eyep.png";
import mail from "../../../assets/Images/email.png";
import styles from "../../../Components/Auth/Registration/registration.module.scss";

type FormPasswordType = {
  email: string;
  password: string;
  changePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  changeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  login: any;
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
