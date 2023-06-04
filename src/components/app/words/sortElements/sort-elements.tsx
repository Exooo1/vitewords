import { FC, memo } from "react";
import { SortElement } from "../sortElement/sort-element";
import { SortChoice } from "../../../../api/wordAPI";
import styles from "./sort_elements.module.scss";
import { SORT_ELEMENTS } from "../../../../constants/constants";

type SortTypeItems = {
  isLoading: boolean;
  fetchSort: (typeSort: SortChoice) => void;
  fetchSortReset: () => void;
};

export const SortElements: FC<SortTypeItems> = memo(
  ({ isLoading, fetchSortReset, fetchSort }) => {
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
