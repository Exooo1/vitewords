import { ChangeEvent, FC, KeyboardEvent, memo, useState } from "react";
import eye from "../../../assets/images/eye.png";
import eye2 from "../../../assets/images/eyep.png";
import mail from "../../../assets/images/email.png";
import styles from "../../../pages/registration/registration.module.scss";
import { imgAttribute } from "../../../utils/functionutils";

type FormPasswordType = {
  email: string;
  password: string;
  changePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  changeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  login: (e: KeyboardEvent, type: string) => void;
  typePress: string;
};
export const FormPassword: FC<FormPasswordType> = memo(
  ({ email, password, changePassword, changeEmail, login, typePress }) => {
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
              onKeyDown={e => login(e, typePress)}
              type={"email"}
              placeholder={"Email"}
              name="email"
              autoComplete="email webauthn"
            />
          </div>
          <img
            {...imgAttribute({
              src: mail,
              alt: "mail",
              role: "mail",
              width: "40px",
              title: "mail"
            })}
          />
        </section>
        <section className={styles.registration_fill_field}>
          <div>
            <label style={{ visibility: password ? "visible" : "hidden" }}>
              Password
            </label>
            <input
              name="password"
              autoComplete="current-password webauthn"
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={changePassword}
              onKeyDown={e => login(e, typePress)}
              placeholder={"Password"}
            />
          </div>
          <img
            {...imgAttribute({
              src: isVisible ? eye2 : eye,
              alt: "password",
              role: "password",
              width: "40px",
              title: "password"
            })}
            onClick={changeVisible}
          />
        </section>
      </>
    );
  }
);
