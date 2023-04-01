import React, {
    ChangeEvent,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import {Word} from "./Word/Word";
import {useAppDispatch, useAppSelector} from "../../../redux/ReduxUtils";
import {
    fetchDeleteWord,
    fetchDownloadFile,
    fetchGetWords,
    fetchSortWords,
    fetchWordFind
} from "../../../redux/WordsReducer";
import {WordModal} from "../../../Common/ModalComponents/WordModal/WordModal";
import {profileReselect} from "../../../redux/Reselect";
import {SortChoice, WordType} from "../../../api/wordAPI";
import {changeTitle} from "../../../Common/usefulFuncs";
import {Loading} from "../../../Common/CommonComponents/Loading/Loading";
import search from "../../../Assets/Images/search.png";
import {SortElementComponents} from "./SortElementsComponents/SortElementComponents";
import {Pagination} from "./Pagination/Pagination";
import {Download} from "./DownloadParameters/Download";
import letters from "../../../Assets/Images/letters.png";
import books from "../../../Assets/Images/books.png";
import styles from "./words.module.scss";

let timeout: ReturnType<typeof setTimeout>;

export const Words = () => {
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [file, setFile] = useState<string>("txt");
    const [find, setFind] = useState<string>("");
    const [current, setCurrent] = useState<number>(1);
    const [isModal, setIsModal] = useState<boolean>(false);
    const {words, totalWords, isLoading} = useAppSelector(profileReselect);
    const dispatch = useAppDispatch();
    useEffect(() => {
        changeTitle("Words");
        dispatch(fetchGetWords(current));
    }, [current]);
    const arr: Array<number> = [];
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
    console.log(current)
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
    const handlerCurrentPagination = useCallback(
        (value: number) => setCurrent(value),
        []
    );
    console.log(current,resultPagination)
    const handlerButtonNext = useCallback(() => {
        if (current===resultPagination) return;
        else setCurrent(state => state + 1)
    }, [current]);
    const handlerButtonPrevious = useCallback(() => {
        if (current > 1) setCurrent(state => state - 1);
        else return;
    }, [current]);
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
        dispatch(fetchSortWords(typeSort));
    }, []);
    const downloadFile = useCallback(() => {
        dispatch(fetchDownloadFile(file));
    }, [file]);
    const handlerFile = useCallback((value: string) => setFile(value), []);
    const handlerCurrent = useCallback(() => setCurrent(1), []);
    const arrayElementsPagination = useMemo(() => arr, [totalWords, current]);
    const memoResult = useMemo(
        () =>
            words.map((item: WordType) => {
                return (
                    <Word
                        id={item._id || ""}
                        key={item._id}
                        {...item}
                        deleteWord={() =>
                            dispatch(fetchDeleteWord({id: item._id || "", word: item.word}))
                        }
                    />
                );
            }),
        [words]
    );

    return (
        <main className={styles.words}>
            {isModal && <WordModal handlerIsModal={() => handlerIsModal(false)}/>}
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
                    <img src={books} alt="books"/>
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
                    <img src={letters} alt="books"/>
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
                                    src="https://cdn-icons-png.flaticon.com/512/3670/3670643.png"
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
                        </section>
                    </section>
                    <button onClick={() => handlerIsModal(true)}>+</button>
                </section>
            </section>
            <section className={styles.words_containerWords}>
                {isLoading ? <Loading/> : memoResult}
            </section>
            <section className={styles.words_footer}>
                <section className={styles.words_footer_showing}>
                    Showing {find.length >= 1 ? words.length : showing()} words of{" "}
                    {find.length >= 1 ? words.length : totalWords} Results
                </section>
                <section className={styles.words_footer_pagination}>
                    {find.length < 1 && (
                        <Pagination
                            handlerNext={handlerButtonNext}
                            handlerPrevious={handlerButtonPrevious}
                            handlerCurrent={handlerCurrent}
                            array={arrayElementsPagination}
                            resultPagination={resultPagination}
                            current={current}
                            handlerPagination={handlerCurrentPagination}
                        />
                    )}
                </section>
                <section className={styles.words_footer_download}>
                    <Download
                        file={file}
                        handlerFile={handlerFile}
                        downloadFile={downloadFile}
                    />
                </section>
            </section>
        </main>
    );
    // <div className="container_words">
    //   <div className="container_words_description">
    //     <div className="container_words_description_one">
    //       <h1>Words Management</h1>
    //       <p>
    //         Here, you can manage your words and phrases, update, delete,
    //         correct. Add everything you know!
    //       </p>
    //     </div>
    //     <div className="container_words_description_two">
    //       <button onClick={() => handlerIsModal(true)}>+ Add new word</button>
    //       <div>
    //         <img src={search} alt="Search" />
    //         <input
    //           value={find}
    //           onChange={handlerFindWord}
    //           type="text"
    //           placeholder="Search by any words"
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="container_words_sort">
    //     <div className="container_words_sort_buttons">
    //       <p>Filters - </p>
    //       <SortElementComponents
    //         fetchSortReset={handlerSortResetFetch}
    //         fetchSort={handlerSortFetch}
    //         isLoading={isLoading}
    //       />
    //     </div>
    //     <div className={"container_words_word"}>
    //       <div className={"container_words_word_item"}>
    //         {isLoading ? <Loading /> : memoResult}
    //       </div>
    //       <div className="container_words_pagination">
    //         <div className="container_words_pagination_showing">
    //           Showing {find.length >= 1 ? words.length : showing()} words of{" "}
    //           {find.length >= 1 ? words.length : totalWords} Results
    //         </div>
    //         <div className="container_words_pagination_logic">
    //           {find.length < 1 && (
    //             <Pagination
    //               handlerNext={handlerButtonNext}
    //               handlerPrevious={handlerButtonPrevious}
    //               handlerCurrent={handlerCurrent}
    //               array={arrayElementsPagination}
    //               resultPagination={resultPagination}
    //               current={current}
    //               handlerPagination={handlerCurrentPagination}
    //             />
    //           )}
    //         </div>
    //         <div className="container_words_selectDownload">
    //           <Download
    //             file={file}
    //             handlerFile={handlerFile}
    //             downloadFile={downloadFile}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
};
