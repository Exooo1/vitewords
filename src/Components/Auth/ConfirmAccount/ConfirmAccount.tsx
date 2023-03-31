import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { changeTitle } from "../../../Common/usefulFuncs";
import { fetchConfirmPassword } from "../../../Redux/AuthReducer";
import { useAppDispatch } from "../../../Redux/ReduxUtils";
import styles from "./confirmed.module.scss";
import verify from "../../../Assets/Images/verify.png";
import { HintModal } from "../../../Common/ModalComponents/HintModal/HintModal";

export const ConfirmAccount = () => {
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
          <img src={verify} alt="confirmEmail" />
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
