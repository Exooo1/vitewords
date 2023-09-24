import { AboutProfile } from "../../components/profile/about-profile";
import { useAppDispatch } from "../../redux/reduxUtils";
import React, { useEffect } from "react";
import { fetchGetProfileInfo } from "../../redux/profileReducer";
import styles from "./profile.module.scss";

export const Profile = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGetProfileInfo());
  }, []);

  return (
    <section className={styles.profile}>
      <section className={styles.profile_oneblock}>
        <section className={styles.profile_oneblock_ASN}>
          <AboutProfile />
        </section>
          <section style={{backgroundColor:'green'}}>2</section>
      </section>
      <section className={styles.profile_twoblock}>
        <h1>Hello</h1>
      </section>
    </section>
  );
};
