import React from "react";
import "./pagination.module.scss";

type PaginationType = {
  id: number;
  click: () => void;
  isActive: boolean;
};
const isActiveStyle = {
    color:'#606373',
    width:'60px',
    borderRadius:'20px',
    transform:'scale(1.3)',
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
