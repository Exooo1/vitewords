import React, { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../../Hooks/Form";
import { FormPassword } from "../../../Common/CommonComponents/FormPassword/FormPassword";
import { changeTitle } from "../../../Common/usefulFuncs";
import { useAppSelector } from "../../../Redux/ReduxUtils";
import { authReselect } from "../../../Redux/Reselect";
import styles from "./login.module.scss";

export const Login: FC = () => {
  const form = useForm();
  const navigate = useNavigate();
  const auth = useAppSelector(authReselect);
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
      <FormPassword {...form} />
      <button onClick={form.login} type="button">
        Log In
      </button>
      <section className={styles.login_description}>
        <p>Don&apos;t have an account or you forgot password</p>
        <section>
          <Link to="/auth/forgot">Forgot Password</Link>
          <Link to="/auth">SignUp</Link>
        </section>
      </section>
    </section>
  );
};
