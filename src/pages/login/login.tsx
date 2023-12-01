import React, { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/form";
import { FormPassword } from "../../components/all/useform/form-password";
import { changeTitle } from "../../utils/functionutils";
import { useAppSelector } from "../../redux/reduxUtils";
import { authReselect } from "../../redux/reselect";
import styles from "./login.module.scss";
import { Loading } from "../../components/all/loading/loading";

export const Login: FC = () => {
  const form = useForm();
  const navigate = useNavigate();
  const auth = useAppSelector(authReselect);
  const isAuth = useAppSelector(state => state.loadingReducer.isAuth);
  if (auth === 1) navigate("/app");

  useEffect(() => {
    changeTitle("Login");
  }, []);

  return (
    <section className={styles.login}>
      <header>
        <h1>
          Login<span>.</span>
        </h1>
        <b>With this app you will grow!</b>
      </header>
      <FormPassword {...form} typePress="login" />
      <section className={styles.login_loading}>
        {isAuth ? (
          <Loading width="100" />
        ) : (
          <button onClick={form.buttonLogin} type="button">
            Log In
          </button>
        )}
      </section>
      <section className={styles.login_description}>
        <p>Don&apos;t have an account or you forgot password</p>
        <section>
          <Link to="/auth/change-password">Forgot Password</Link>
          <Link to="/auth">SignUp</Link>
        </section>
      </section>
    </section>
  );
};
