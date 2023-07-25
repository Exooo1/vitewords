import styles from "./profile.module.scss";
import { AboutProfile } from "../../components/profile/about-profile";
import { useAppDispatch } from "../../redux/reduxUtils";
import { useEffect } from "react";
import { fetchGetProfileInfo } from "../../redux/profileReducer";

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
          <AboutProfile />
          <AboutProfile />
        </section>
      </section>
      <section className={styles.profile_twoblock}>
        <h1>Hello</h1>
      </section>
    </section>
  );
};
