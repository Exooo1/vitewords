import React, { FC, useEffect, useState } from "react";
import { HintModal } from "../modals/hintModal/hint-modal";
import { NAV } from "../../constants/constants";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/reduxUtils";
import { authReselect } from "../../redux/reselect";
import { fetchGetAuth, fetchLogOut } from "../../redux/authReducer";

import logo from "../../assets/images/logo.png";
import logout from "../../assets/images/logout.png";
import styles from "./appVocabulary.module.scss";
import { imgAttribute } from "../../utils/functionutils";

export const AppVocabulary: FC = () => {
  const auth = useAppSelector(authReselect);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [nav, setNav] = useState(NAV);

  useEffect(() => {
    dispatch(fetchGetAuth());
  }, []);

  useEffect(() => {
    setNav(
      nav.map(el =>
        pathname === el.path ? { ...el, style: true } : { ...el, style: false }
      )
    );
    if (auth === 0) navigate("/auth");
  }, [auth, pathname]);

  const changeNav = (id: number) => {
    setNav(
      nav.map(item =>
        item.id !== id ? { ...item, style: false } : { ...item, style: true }
      )
    );
  };
  const handlerLogOut = () => dispatch(fetchLogOut());
  const arrayLinks = nav.map(item => {
    return (
      <section
        key={item.id + item.name}
        className={item.style ? styles.container_aside_navActive : ""}
      >
        <img
          {...imgAttribute({
            src: item.img,
            alt: item.name,
            role: item.name,
            width: "40px",
            title: item.name
          })}
        />
        <Link key={item.id} to={item.path} onClick={() => changeNav(item.id)}>
          {item.name}
        </Link>
      </section>
    );
  });

  return (
    <main className={styles.container}>
      <HintModal />
      <aside className={styles.container_aside}>
        <figure>
          <img
            {...imgAttribute({
              src: logo,
              alt: "logo",
              role: "logo",
              width: "350px",
              title: "logo"
            })}
            src={logo}
          />
          <section>
            <h1>
              Vocabulary <sup>App</sup>
            </h1>
          </section>
        </figure>
        <nav>{arrayLinks}</nav>
        <section className={styles.container_logout} onClick={handlerLogOut}>
          <img
            {...imgAttribute({
              src: logout,
              alt: "logout",
              role: "logout",
              width: "40px",
              title: "logout"
            })}
          />
          <p>Log Out</p>
        </section>
      </aside>
      <Outlet />
    </main>
  );
};
