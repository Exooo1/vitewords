import React from "react";
import {PaginationElements} from "./PaginationElements";
import styles from './pagination.module.scss'

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
        console.log(array.length > 1 && current<resultPagination)
        return (
            <section className={styles.container}>
                <button onClick={handlerPrevious}>&#171;</button>
                <section className={styles.container_pagination}>
                    {current > 3 && <p onClick={handlerCurrent}>1...</p>}
                    {array.length >= 1 && paginationElements()}
                    <p onClick={() => handlerPagination(resultPagination)}>
                        ... {array.length > 1 && current<resultPagination&&resultPagination}
                    </p>
                </section>
                <button onClick={handlerNext}>&#187;</button>
            </section>
        );
    }
);
