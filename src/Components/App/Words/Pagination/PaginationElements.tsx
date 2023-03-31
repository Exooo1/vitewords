import React from "react";
import "./pagination.module.scss";

type PaginationType = {
  id: number;
  click: () => void;
  isActive: boolean;
};
const isActiveStyle = {
    color:'#00bcd4',
    transform:'scale(0.8)',
    fontWeight:900
}
export const PaginationElements = ({ id, click, isActive }: PaginationType) => {
  return (
    <section
      onClick={click}
      style={isActive?isActiveStyle:{}}
    >
        <p>{id}</p>
    </section>
  );
};
