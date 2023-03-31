import React from "react";
import { Link } from "react-router-dom";
import styles from "../appVocabulary.module.scss";

type LinkAppType = {
  path: string;
  name: string;
  img: string;
  click: () => void;
  style: boolean;
};

export const NavLinkElement: React.FC<LinkAppType> = ({
  path,
  style,
  name,
  img,
  click
}) => {
  return (
    <div className={style ? styles.nav_content_links_activeClass : ""}>
      <img src={img} alt={name} />
      <Link to={path} onClick={click}>
        {name}
      </Link>
    </div>
  );
};
