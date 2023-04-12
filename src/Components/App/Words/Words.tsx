import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { Word } from "./Word/Word";
import { useAppDispatch, useAppSelector } from "../../../redux/ReduxUtils";
import {
  fetchDeleteWord,
  fetchDownloadFile,
  fetchGetWords,
  fetchSortWords,
  fetchWordFind
} from "../../../redux/WordsReducer";
import { WordModal } from "../../../Common/ModalComponents/WordModal/WordModal";
import { profileReselect } from "../../../redux/Reselect";
import { SortChoice, WordType } from "../../../api/wordAPI";
import { changeTitle } from "../../../Common/usefulFuncs";
import { Loading } from "../../../Common/CommonComponents/Loading/Loading";
import { SortElementComponents } from "./SortElementsComponents/SortElementComponents";
import { Pagination } from "./Pagination/Pagination";
import { Download } from "./DownloadParameters/Download";

import search from "../../../assets/Images/search.png";
import managment from "../../../assets/Images/knowlegde.png";
import knowledge from "../../../assets/Images/sortknowleadge.png";
import abc from "../../../assets/Images/abc.png";
import styles from "./words.module.scss";

let timeout: ReturnType<typeof setTimeout>;
let sortValue: number = 0;

export const Words = () => {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [file, setFile] = useState<string>("txt");
  const [find, setFind] = useState<string>("");
  const [current, setCurrent] = useState<number>(1);
  const [isModal, setIsModal] = useState<boolean>(false);
  const { words, totalWords, isLoading } = useAppSelector(profileReselect);
  const arr: Array<number> = [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    changeTitle("Words");
    dispatch(fetchGetWords(current));
  }, [current]);

  const COUNT_WORDS = 15;
  const resultPagination = Math.ceil(totalWords / COUNT_WORDS);
  const handlerFindWord = (e: ChangeEvent<HTMLInputElement>) => {
    setFind(e.target.value);
    clearTimeout(timeout);
    if (!e.target.value) {
      dispatch(fetchGetWords(current));
      return;
    }
    timeout = setTimeout(() => {
      dispatch(fetchWordFind(e.target.value));
    }, 500);
  };
  const returnArrayPagination = () => {
    const right = () => {
      const result = resultPagination - (current + 2);
      if (result < 0) return resultPagination;
      return resultPagination - result;
    };
    const left = () => {
      if (current - 1 <= 0) return 0;
      if (current - 1 >= 2) return 2;
      else return 1;
    };
    for (let i = current - left(); i <= right(); i++) {
      arr.push(i);
    }
  };
  returnArrayPagination();
  const handlerIsModal = (value: boolean) => setIsModal(value);
  const handlerCurrentPagination = (value: number) => setCurrent(value);

  const handlerButtonNext = () => {
    if (current === resultPagination) return;
    else setCurrent(state => state + 1);
  };
  const handlerButtonPrevious = () => {
    if (current > 1) setCurrent(state => state - 1);
    else return;
  };
  const showing = () => {
    const total = totalWords - current * COUNT_WORDS;
    if (total > 0) return current * COUNT_WORDS;
    else return current * COUNT_WORDS - Math.abs(total);
  };
  const handlerSortResetFetch = useCallback(() => {
    setFind("");
    dispatch(fetchGetWords(current));
  }, []);

  const handlerSortFetch = useCallback((typeSort: SortChoice) => {
    if (new Date().getTime() > sortValue) {
      dispatch(fetchSortWords(typeSort));
      sortValue = new Date().getTime() + 2000;
    } else return;
  }, []);

  const downloadFile = useCallback(() => {
    dispatch(fetchDownloadFile(file));
  }, [file]);
  const handlerCurrent = () => setCurrent(1);
  const memoResult = useMemo(
    () =>
      words.map((item: WordType) => {
        return (
          <Word
            id={item._id || ""}
            key={item._id}
            {...item}
            deleteWord={() =>
              dispatch(fetchDeleteWord({ id: item._id || "", word: item.word }))
            }
          />
        );
      }),
    [words]
  );

  const MemoResultPagination = () => {
    return (
      <Pagination
        handlerNext={handlerButtonNext}
        handlerPrevious={handlerButtonPrevious}
        handlerCurrent={handlerCurrent}
        array={arr}
        resultPagination={resultPagination}
        current={current}
        handlerPagination={handlerCurrentPagination}
      />
    );
  };

  return (
    <main className={styles.words}>
      {isModal && <WordModal handlerIsModal={() => handlerIsModal(false)} />}
      <section className={styles.words_header}>
        <section className={styles.words_header_description}>
          <section>
            <h2>Words Management</h2>
            <p>
              Word management allows you to delete, modify, add new words and
              phrases, as well as track the progress of adding words, and of
              course repeat the words you have learned.
            </p>
          </section>
          <img src={managment} alt="managment" role="picture" />
        </section>
        <section className={styles.words_header_filters}>
          <section className={styles.words_header_filters_description}>
            <h2>Words Filters</h2>
            <p>
              You can filter the words as you like, of course there is not much
              choice now, but there will be more in the future.
            </p>
            <SortElementComponents
              fetchSortReset={handlerSortResetFetch}
              fetchSort={handlerSortFetch}
              isLoading={isLoading}
            />
          </section>
          <img src={knowledge} alt="knowledge" role="picture" />
        </section>
        <section className={styles.words_header_search}>
          <section className={styles.words_header_search_description}>
            <h2>Words Search,Add</h2>
            <p>
              Search and add? hmm... You can add a new word and a search word.
            </p>
            <section className={styles.words_header_search_description_newWord}>
              <section
                className={
                  isSearch
                    ? styles.words_header_search_description_newWord_isActive
                    : ""
                }
              >
                <img
                  src={search}
                  alt="search"
                  onClick={() => setIsSearch(!isSearch)}
                />
                <input
                  value={find}
                  onChange={handlerFindWord}
                  type="text"
                  placeholder="Search a word"
                />
              </section>
              <button onClick={() => handlerIsModal(true)}>+</button>
            </section>
          </section>
          <img src={abc} alt="abc-search" role="picture" />
        </section>
      </section>
      <section className={styles.words_containerWords}>
        {isLoading ? <Loading width="650" /> : memoResult}
      </section>
      <section className={styles.words_footer}>
        <section className={styles.words_footer_showing}>
          Showing{" "}
          {find.length >= 1
            ? words.length >= 1
              ? `1-${words.length}`
              : words.length
            : `${
                showing() - COUNT_WORDS
                  ? showing() - COUNT_WORDS
                  : showing() - COUNT_WORDS + 1
              }-${showing()}`}{" "}
          words of {find.length >= 1 ? words.length : totalWords} Results
        </section>
        <section className={styles.words_footer_pagination}>
          {find.length < 1 && <MemoResultPagination />}
        </section>
        <section className={styles.words_footer_download}>
          <Download
            file={file}
            handlerFile={setFile}
            downloadFile={downloadFile}
          />
        </section>
      </section>
    </main>
  );
};
