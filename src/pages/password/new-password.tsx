import { ChangeEvent, useState } from "react";
import password from "../../assets/images/passwrod-new.png";
import styles from "./password.module.scss";
import styles2 from "../registration/registration.module.scss";
import { useAppDispatch } from "../../redux/reduxUtils";
import { handlerDeleteHint } from "../../utils/functionutils";
import { HintModal } from "../../components/modals/hintModal/hint-modal";
import { fetchNewPassword } from "../../redux/authReducer";
import { useParams } from "react-router-dom";
import eye from "../../assets/images/eye.png";
import eye2 from "../../assets/images/eyep.png";
import newPassword from "../../assets/images/passwrod-new.png";

export const NewPassword = () => {
  const dispatch = useAppDispatch();
  const { id = "" } = useParams();
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

  const [isVisible, setVisible] = useState<boolean>(false);
  const changeVisible = () => setVisible(!isVisible);

  const handlerState =
    (state: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      state(e.target.value);
    };

  const handlerAccept = () => {
    if (passwordOne.length < 3 || passwordTwo.length < 3) {
      handlerDeleteHint(
        "Password should be more than 3 characters",
        dispatch,
        "error"
      );
      return;
    }
    if (passwordOne !== passwordTwo) {
      handlerDeleteHint("Passwords are different", dispatch, "error");
      return;
    }
    dispatch(fetchNewPassword({ id, password: passwordOne }));
  };

  return (
    <>
      <HintModal />
      <section className={styles.newPassword}>
        <section className={styles.newPassword_section}>
          <h1>Come up with a new password</h1>
          <img className={styles.newPassword_section_image} src={newPassword} alt="newPassword" />
          <section className={styles.newPassword_section_forms}>
            <section className={styles2.registration_fill_field}>
              <div>
                <label
                  style={{ visibility: passwordOne ? "visible" : "hidden" }}
                >
                  Password
                </label>
                <input
                  name="password"
                  autoComplete="current-password webauthn"
                  type={isVisible ? "text" : "password"}
                  value={passwordOne}
                  onChange={handlerState(setPasswordOne)}
                  placeholder={"Password"}
                />
              </div>
              <img
                onClick={changeVisible}
                src={isVisible ? eye2 : eye}
                alt={password}
                role="password-picture"
                title="password"
              />
            </section>
            <section className={styles2.registration_fill_field}>
              <div>
                <label
                  style={{ visibility: passwordTwo ? "visible" : "hidden" }}
                >
                  Password
                </label>
                <input
                  name="password"
                  autoComplete="current-password webauthn"
                  type={isVisible ? "text" : "password"}
                  value={passwordTwo}
                  onChange={handlerState(setPasswordTwo)}
                  placeholder={"Repeat password"}
                />
              </div>
              <img
                onClick={changeVisible}
                src={isVisible ? eye2 : eye}
                alt={password}
                role="password-picture"
                title="password"
              />
            </section>
          </section>
          <button onClick={handlerAccept}>Accept</button>
        </section>
      </section>
    </>
  );
};
