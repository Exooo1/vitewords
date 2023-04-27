import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { changeTitle } from "../../utils/functionutils";
import { fetchConfirmPassword } from "../../redux/authReducer";
import { useAppDispatch } from "../../redux/reduxUtils";
import styles from "./confirmed.module.scss";
import verify from "../../assets/images/verify.png";
import { HintModal } from "../../components/modals/hintModal/hint-modal";

export const ConfirmAccount: FC = () => {
  const redirect = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const fetchConfirm = async () => {
    dispatch(fetchConfirmPassword(String(id)));
  };
  useEffect(() => {
    changeTitle("ConfirmAccount");
    fetchConfirm();
  }, []);
  const navigate = () => {
    redirect("/auth/login");
  };
  return (
    <>
      <HintModal />
      <section className={styles.confirmed}>
        <figure className={styles.confirmed_content}>
          <h2>
            Congratulations<span>!</span>
          </h2>
          <img src={verify} alt="confirmEmail" role="confirm-email-picture" />
          <p>
            Your account is registered, you can already log in to your account.
          </p>
          <button type="button" onClick={navigate}>
            Log In
          </button>
        </figure>
      </section>
    </>
  );
};
