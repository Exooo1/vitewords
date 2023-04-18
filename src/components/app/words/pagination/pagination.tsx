import React from "react";
import { PaginationElements } from "./pagination-elements";
import styles from "./pagination.module.scss";

type PaginationType = {
  current: number;
  handlerCurrent: () => void;
  resultPagination: number;
  handlerPagination: (value: number) => void;
  array: Array<number>;
  handlerNext: () => void;
  handlerPrevious: () => void;
};

export const Pagination: React.FC<PaginationType> = React.memo(
  ({
    handlerNext,
    handlerPrevious,
    array,
    current,
    handlerCurrent,
    handlerPagination,
    resultPagination
  }) => {
    const paginationElements = () => {
      return array.map((item: number) => (
        <PaginationElements
          key={item}
          click={() => handlerPagination(item)}
          isActive={item === current}
          id={item}
        />
      ));
    };
    return (
      <section className={styles.container}>
        <button onClick={handlerPrevious}>
          <span>&#171;</span>
        </button>
        <section className={styles.container_isActive}>
          {" "}
          {current > 3 && <p onClick={handlerCurrent}>1...</p>}
        </section>
        <section className={styles.container_pagination}>
          {array.length >= 1 && paginationElements()}
        </section>
        <section className={styles.container_isActive}>
          <p onClick={() => handlerPagination(resultPagination)}>
            {array.length > 1 &&
              current < resultPagination &&
              resultPagination + "..."}
          </p>
        </section>
        <button onClick={handlerNext}>
          <span>&#187;</span>
        </button>
      </section>
    );
  }
);
