import React, {ChangeEvent, memo, useState} from "react";
import eye from "../../../Assets/Images/eye.png";
import eye2 from "../../../Assets/Images/eyep.png";
import mail from "../../../Assets/Images/email.png";
import styles from "../../../Components/Auth/Registration/registration.module.scss";

type FormPasswordType = {
  email: string;
  password: string;
  changePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  changeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const FormPassword: React.FC<FormPasswordType> = memo(
  ({ email, password, changePassword, changeEmail }) => {
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
