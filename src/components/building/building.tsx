import styles from "./building.module.scss";
import building from "../../assets/images/building.png";
import { useLocation } from "react-router-dom";

export const Building = () => {
  const location = useLocation();
  const page =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  return (
    <figure className={styles.building}>
      <img src={building} alt="building" role="picture" />
      <h2>We are working on {page}...</h2>
    </figure>
  );
};
