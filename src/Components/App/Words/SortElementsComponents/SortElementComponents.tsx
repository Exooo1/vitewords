import React from "react";
import {SortElement} from "../SortElements/SortElement";
import {SortChoice} from "../../../../api/wordAPI";
import styles from "./sort_elements.module.scss";
import {SORT_ELEMENTS} from "../../../../constants/constants";

type SortTypeItems = {
    isLoading: boolean;
    fetchSort: (typeSort: SortChoice) => void;
    fetchSortReset: () => void;
};

export const SortElementComponents: React.FC<SortTypeItems> = React.memo(
    ({isLoading, fetchSortReset, fetchSort}) => {
        const sortElements = SORT_ELEMENTS;
        const handlerSort = (name: string, sort: SortChoice) => {
            fetchSort(sort);
        };
        const handlerSortReset = () => {
            fetchSortReset();
        };
        return (
            <section className={styles.sortElements}>
                {sortElements.map(item => {
                    return (
                        <SortElement
                            sortElem={() => handlerSort(item.name, item.sort)}
                            key={item.id}
                            isLoading={isLoading}
                            {...item}
                        />
                    );
                })}
                <button
                    className="button_reset_filters"
                    onClick={handlerSortReset}
                    disabled={isLoading}
                >
                    X
                </button>
            </section>
        );
    }
);
