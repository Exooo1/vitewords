import { ChangeEvent, useState } from "react";
import password from "../../assets/images/passwrod-new.png";
import styles from "./password.module.scss";
import { useAppDispatch } from "../../redux/reduxUtils";
import { handlerDeleteHint } from "../../utils/functionutils";
import { HintModal } from "../../components/modals/hintModal/hint-modal";
import { fetchNewPassword } from "../../redux/authReducer";
import { useParams } from "react-router-dom";

export const NewPassword = () => {
  const dispatch = useAppDispatch();
  const { id = '' } = useParams();
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

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
          <img src={password} alt="" />
          <section className={styles.newPassword_section_forms}>
            <input
              value={passwordOne}
              onChange={handlerState(setPasswordOne)}
              type="password"
              placeholder="new password"
            />
            <input
              value={passwordTwo}
              onChange={handlerState(setPasswordTwo)}
              type="password"
              placeholder="repeat password"
            />
          </section>
          <button onClick={handlerAccept}>Accept</button>
        </section>
      </section>
    </>
  );
};
