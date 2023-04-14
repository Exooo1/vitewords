import React, { useEffect, useState } from "react";
import { HintModal } from "../../Common/ModalComponents/HintModal/HintModal";
import { NAV } from "../../constants/constants";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/ReduxUtils";
import { authReselect } from "../../redux/Reselect";
import { fetchLogOut } from "../../redux/AuthReducer";

import logo from "../../assets/Images/logo.png";
import logout from "../../assets/Images/logout.png";
import styles from "./appVocabulary.module.scss";

export const AppVocabulary = () => {
  const auth = useAppSelector(authReselect);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [nav, setNav] = useState(NAV);
  useEffect(() => {
    navigate("/app/words");
    if (auth === 0) navigate("/auth");
  }, [auth]);
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
        <img src={item.img} alt={item.name} />
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
          <img src={logo} alt="logo" />
          <section>
            <h1>
              Vocabulary <sup>App</sup>
            </h1>
          </section>
        </figure>
        <nav>{arrayLinks}</nav>
        <section className={styles.container_logout} onClick={handlerLogOut}>
          <img src={logout} alt="LogOut" />
          <p>Log Out</p>
        </section>
      </aside>
      <Outlet />
    </main>
  );
};
