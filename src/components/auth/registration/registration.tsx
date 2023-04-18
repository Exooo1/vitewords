import React, { FC, useEffect } from "react";
import { LinkMemo } from "../../all/memoLink/Link";
import { fetchGetAuth } from "../../../redux/authReducer";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxUtils";
import { useForm } from "../../../hooks/form";
import { Navigate } from "react-router-dom";
import { FormPassword } from "../../all/useform/FormPassword";
import { authReselect, resultCodeReselect } from "../../../redux/reselect";

import styles from "./registration.module.scss";

export const Registration: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGetAuth());
  }, []);
  const { password, email, changePassword, changeEmail, ...form } = useForm();
  const resultCode = useAppSelector(resultCodeReselect);
  const auth = useAppSelector(authReselect);
  if (resultCode === 1) return <Navigate to="/auth/email" replace={true} />;
  if (auth === 1) return <Navigate to="/app" replace={true} />;
  const profile = form.itemsProfile.map(item => {
    return (
      <section key={item.id} className={styles.registration_fill_field}>
        <div>
          <label style={{ visibility: item.name ? "visible" : "hidden" }}>
            {item.plc}
          </label>
          <input
            value={item.name}
            onChange={item.change}
            type={item.type}
            placeholder={item.plc}
          />
        </div>
        <img src={item.img} alt={item.name} />
      </section>
    );
  });
  return (
    <section className={styles.registration}>
      <header>
        <b>START FOR FREE</b>
        <h1>
          Create new Account <span>.</span>
        </h1>
        <b>
          Already A Member? <LinkMemo name="Login" path="login" />
        </b>
      </header>
      <section className={styles.registration_fill}>
        {profile}
        <FormPassword
          email={email}
          password={password}
          changeEmail={changeEmail}
          changePassword={changePassword}
        />
      </section>
      <section className={styles.registration_button}>
        <button type="button" onClick={form.createAccount}>
          CreateAccount
        </button>
      </section>
    </section>
  );
};
