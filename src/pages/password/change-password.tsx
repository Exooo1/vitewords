import styles from "./password.module.scss";
import styles2 from "../registration/registration.module.scss";
import React, { ChangeEvent, FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxUtils";
import { handlerDeleteHint, imgAttribute } from "../../utils/functionutils";
import { HintModal } from "../../components/modals/hintModal/hint-modal";
import { fetchChangePassword } from "../../redux/authReducer";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/all/loading/loading";
import mail from "../../assets/images/email.png";
import guard from "../../assets/images/guard.png";

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
          <img
            {...imgAttribute({
              src: guard,
              alt: "guard",
              role: "guard",
              width: "20%",
              title: "guard"
            })}
            className={styles.password_section_image}
          />
          {newPassword ? (
            <SentEmail />
          ) : (
            <>
              <p>
                Please enter your email address to receive a{" "}
                <b>Verification Account</b>
              </p>
              <section className={styles2.registration_fill_field}>
                <div>
                  <label style={{ visibility: email ? "visible" : "hidden" }}>
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={handlerEmail}
                    type={"email"}
                    placeholder={"Email"}
                    name="email"
                    autoComplete="email webauthn"
                  />
                </div>
                <img
                  {...imgAttribute({
                    src: mail,
                    alt: "email",
                    role: "email",
                    width: "40px",
                    title: "email"
                  })}
                />
              </section>
              {isLoading ? (
                <button>
                  <Loading width="95" />
                </button>
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
