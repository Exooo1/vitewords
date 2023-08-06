import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { Word } from "./word/word";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxUtils";
import {
  fetchDeleteWord,
  fetchDownloadFile,
  fetchGetWords,
  fetchSortWords,
  fetchWordFind
} from "../../../redux/wordsReducer";
import { WordModal } from "../../modals/wordModal/word-modal";
import { profileReselect } from "../../../redux/reselect";
import { SortChoice, WordType } from "../../../api/wordAPI";
import { changeTitle, imgAttribute } from "../../../utils/functionutils";
import { Loading } from "../../all/loading/loading";
import { SortElements } from "./sortElements/sort-elements";
import { Pagination } from "./pagination/pagination";
import { Download } from "./download/download";

import search from "../../../assets/images/search.png";
import knowledge from "../../../assets/images/sortknowleadge.png";
import abc from "../../../assets/images/abc.png";
import managment from "../../../assets/images/management.png";
import styles from "./words.module.scss";

let timeout: ReturnType<typeof setTimeout>;
let sortValue: number = 0;

export const Words: FC = () => {
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
    if (current === resultPagination || !resultPagination) return;
    else setCurrent(state => state + 1);
  };
  const handlerButtonPrevious = () => {
    if (current > 1) setCurrent(state => state - 1);
    else return;
  };
  const showing = () => {
    let end = totalWords - COUNT_WORDS * current;
    let start = words.length
      ? COUNT_WORDS * current - COUNT_WORDS + 1
      : words.length;
    if (end > 0) end = COUNT_WORDS * current;
    else end = COUNT_WORDS * current - Math.abs(end);
    const isFind = find.length ? words.length : `${start}-${end}`
    return `Showing ${isFind} words of ${
      find.length ? words.length : totalWords
    } results`;
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
  const memoPagination = useMemo(() => {
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
  }, [current, totalWords]);

  const memoWords = useMemo(
    () =>
      words.map((item: WordType) => {
        return (
          <Word
            key={item._id}
            id={item._id || ""}
            {...item}
            deleteWord={() =>
              dispatch(fetchDeleteWord({ id: item._id || "", word: item.word }))
            }
          />
        );
      }),
    [words]
  );


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
          <img
            {...imgAttribute({
              src: managment,
              alt: "managment",
              role: "picture",
              width: "160px"
            })}
          />
        </section>
        <section className={styles.words_header_filters}>
          <section className={styles.words_header_filters_description}>
            <h2>Words Filters</h2>
            <p>
              You can filter the words as you like, of course there is not much
              choice now, but there will be more in the future.
            </p>
            <SortElements
              fetchSortReset={handlerSortResetFetch}
              fetchSort={handlerSortFetch}
              isLoading={isLoading}
            />
          </section>
          <img
            {...imgAttribute({
              src: knowledge,
              alt: "knowledge",
              role: "picture",
              width: "160px"
            })}
          />
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
                  title="search"
                  role="search-img"
                  src={search}
                  alt="search"
                  onClick={() => setIsSearch(!isSearch)}
                />
                {isSearch ? (
                  <input
                    value={find}
                    onChange={handlerFindWord}
                    type="text"
                    placeholder="Search a word"
                  />
                ) : null}
              </section>
              <button onClick={() => handlerIsModal(true)}>+</button>
            </section>
          </section>
          <img
            {...imgAttribute({
              src: abc,
              alt: "abc",
              role: "picture",
              width: "160px"
            })}
          />
        </section>
      </section>
      <section className={styles.words_containerWords}>
        {isLoading ? <Loading width="650" /> : memoWords}
      </section>
      <section className={styles.words_footer}>
        <section className={styles.words_footer_showing}>
          {showing()}
        </section>
        <section className={styles.words_footer_pagination}>
          {find.length < 1 && memoPagination}
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
