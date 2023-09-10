import { FC, useState } from "react";
import styles from "./post.module.scss";
import { StatusModal } from "../../modals/status/status-modal";
import { useAppDispatch } from "../../../redux/reduxUtils";
import { fetchSetStatus } from "../../../redux/profileReducer";

type TPost = {
  status: string;
  emoji: string;
};

export const Post: FC<TPost> = ({ emoji, status }) => {
  const dispatch = useAppDispatch();
  const [isNewPost, setIsNewPost] = useState<boolean>(false);
  const handlerIsNewPost = () => setIsNewPost(!isNewPost);
  const handlerSetStatus = (status: string, emoji: string) => {
    dispatch(fetchSetStatus({ status, emoji }));
    handlerIsNewPost()
  };

  return (
    <div className={styles.post}>
      {isNewPost ? (
        <StatusModal
          setStatus={handlerSetStatus}
          closeNewPost={handlerIsNewPost}
          status={status}
          emoji={emoji}
        />
      ) : null}
      <section className={styles.post_description}>
        <p dangerouslySetInnerHTML={{ __html: emoji || '🌊' }}></p>
        <p onClick={handlerIsNewPost}> {status || "Set status..."}</p>
      </section>
    </div>
  );
};
