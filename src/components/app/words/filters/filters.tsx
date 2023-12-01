import { memo, useState } from "react";
import { imgAttribute } from "../../../../utils/functionutils";
import { SortChoice } from "../../../../api/wordAPI";
import { SORT_ELEMENTS } from "../../../../constants/constants";
import { SortElementsType } from "../../../../utils/types/commonTypes";
import arrowDown from "../../../../assets/images/arrow-down.png";
import filters from "../../../../assets/images/filters.png";
import styles from "./filters.module.scss";

type SortTypeItems = {
  isLoading: boolean;
  fetchSort: (typeSort: SortChoice) => void;
  fetchSortReset: () => void;
  handlerFindWord: (value: string) => void;
  find: string;
  setIsModal: (value: boolean) => void;
};

export const Filters = memo(
  ({
    isLoading,
    fetchSortReset,
    fetchSort,
    handlerFindWord,
    find,
    setIsModal
  }: SortTypeItems) => {
    const [select, setSelect] = useState<string>("Select the filter");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handlerOpen = () => setIsOpen(!isOpen);
    const handlerSelect = (filter: SortElementsType) => {
      setSelect(filter.name);
      fetchSort(filter.sort);
    };
    const handlerCleanFilter = () => {
      fetchSortReset();
      setSelect("Select the filter");
    };
    const handlerIsModal = () => setIsModal(true);

    return (
      <section className={styles.filters}>
        <section className={styles.filters_splitFilters}>
          <input
            placeholder="I am looking..."
            value={find}
            onChange={e => handlerFindWord(e.target.value)}
            autoFocus={true}
            type="text"
          />
          <section
            className={styles.filters_splitFilters_options}
            onClick={handlerOpen}
          >
            <section className={styles.filters_splitFilters_options_filters}>
              <img
                {...imgAttribute({
                  src: filters,
                  alt: "filters",
                  role: "filters",
                  width: "20px",
                  title: "filters"
                })}
              />
              <p>{select}</p>
              <img
                {...imgAttribute({
                  src: arrowDown,
                  alt: "arrow",
                  role: "arrow",
                  width: "20px",
                  title: "arrow"
                })}
                style={{ transform: isOpen ? "rotate(180deg)" : "" }}
              />
            </section>
            {isOpen ? (
              <section className={styles.filters_splitFilters_options_open}>
                {SORT_ELEMENTS.map(el => (
                  <p key={el.id} onClick={() => handlerSelect(el)}>
                    {el.name}
                  </p>
                ))}
              </section>
            ) : null}
          </section>
          <button onClick={handlerIsModal}>+</button>
          <button disabled={isLoading} onClick={handlerCleanFilter}>
            x
          </button>
        </section>
      </section>
    );
  }
);
