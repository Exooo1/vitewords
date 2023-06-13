import React, { FC } from "react";
import { useAppSelector } from "../../redux/reduxUtils";
import { useForm } from "../../hooks/form";
import { Link, Navigate } from "react-router-dom";
import { FormPassword } from "../../components/all/useform/form-password";
import { resultCodeReselect } from "../../redux/reselect";

import styles from "./registration.module.scss";

export const Registration: FC = () => {

  const { password, email, changePassword, changeEmail, login, ...form } =
    useForm();
  const resultCode = useAppSelector(resultCodeReselect);
  if (resultCode === 1) return <Navigate to="/auth/email" replace={true} />;

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
          Already A Member? <Link to="login">login</Link>
        </b>
      </header>
      <section className={styles.registration_fill}>
        {profile}
        <FormPassword
          email={email}
          password={password}
          changeEmail={changeEmail}
          changePassword={changePassword}
          login={login}
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
