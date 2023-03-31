import React, {useState} from "react";
import {SortElement} from "../SortElements/SortElement";
import {SortChoice} from "../../../../api/wordAPI";
import styles from "./sort_elements.module.scss";

type SortElementsType = {
    id: number;
    name: string;
    sort: SortChoice;
};
type SortTypeItems = {
    isLoading: boolean;
    fetchSort: (typeSort: SortChoice) => void;
    fetchSortReset: () => void;
};

export const SortElementComponents: React.FC<SortTypeItems> = React.memo(
    ({isLoading, fetchSortReset, fetchSort}) => {
        const [sortElements, setSortElements] = useState<Array<SortElementsType>>([
            {id: 2, name: "Description", sort: "DESCRIPTION"},
            {id: 3, name: "Added", sort: "ADDED"}
        ]);
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
