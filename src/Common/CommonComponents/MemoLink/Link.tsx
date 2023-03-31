import React from "react";
import { Link } from "react-router-dom";

type MemoLinkType = {
  name: string;
  path: string;
  click?: () => void;
};
export const LinkMemo: React.FC<MemoLinkType> = React.memo(
  ({ name, path, click }) => {
    return (
      <Link onClick={click} to={path}>
        {name}
      </Link>
    );
  }
);
