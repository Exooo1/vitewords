import { ChangeEvent, FC, memo } from "react";
import styles from "./download.module.scss";

type DownloadType = {
  handlerFile: (value: string) => void;
  file: string;
  downloadFile: () => void;
};
export const Download: FC<DownloadType> = memo(
  ({ downloadFile, file, handlerFile }) => {
    const changeFile = (e: ChangeEvent<HTMLSelectElement>) => {
      handlerFile(e.target.value);
    };
    return (
      <section className={styles.download}>
        <p onClick={downloadFile}>Download File</p>
        <select value={file} onChange={changeFile}>
          <option value="txt">.txt</option>
          <option value="pdf">.pdf</option>
          <option value="doc">.doc</option>
        </select>
      </section>
    );
  }
);
