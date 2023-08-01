import styles from "./password.module.scss";
import guard from "../../assets/images/guard.png";
import { ChangeEvent, FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxUtils";
import { handlerDeleteHint } from "../../utils/functionutils";
import { HintModal } from "../../components/modals/hintModal/hint-modal";
import { fetchChangePassword } from "../../redux/authReducer";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/all/loading/loading";

const SentEmail = () => {
  const navigate = useNavigate();
  const handlerRoute = () => navigate("/auth/login");
  return (
    <>
      <p style={{ color: "#00ff00" }}>
        Your email has been sent, please check your email, do not pass your
        password change link to anyone!
      </p>
      <button onClick={handlerRoute}>Main</button>
    </>
  );
};

export const ChangePassword: FC = () => {
  const newPassword = useAppSelector(state => state.authReducer.newPassword);
  const isLoading = useAppSelector(state => state.authReducer.isLoading);
  const [email, setEmail] = useState<string>("");
  const dispatch = useAppDispatch();

  const handlerEmailSend = () => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email)) {
      handlerDeleteHint("incorrect email", dispatch, "error");
      return;
    }
    dispatch(fetchChangePassword(email));
  };
  const handlerEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  return (
    <>
      <HintModal />
      <section className={styles.password}>
        <section className={styles.password_section}>
          <h1>Forgot Password</h1>
          <img src={guard} alt="guard" role="guard-picture" title="guard" />
          {newPassword ? (
            <SentEmail />
          ) : (
            <>
              <p>
                Please enter your email address to receive a{" "}
                <b>Verification Account</b>
              </p>
              <input
                value={email}
                onChange={handlerEmail}
                placeholder="example@gmail.com"
                type="text"
              />
              {isLoading ? (
                <button><Loading width="95" /></button>
              ) : (
                <button onClick={handlerEmailSend}>Send</button>
              )}
            </>
          )}
        </section>
      </section>
    </>
  );
};
