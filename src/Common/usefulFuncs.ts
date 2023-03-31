import { addHint, deleteHint, PayloadHintType } from "../Redux/ErrorsReducer";

type StatusTypeHint = "done" | "error";

export const changeTitle = (text: string) => {
  const title = document.getElementsByTagName("title");
  title[0].innerText = text;
};
export const handlerDeleteHint = (
  value: string,
  dispatch: (item: { payload: PayloadHintType | string }) => void,
  status: StatusTypeHint
) => {
  const v4id = (Math.random() * 10).toString(36).slice(2);
  dispatch(addHint({ v4id, article: value, status }));
  setTimeout(() => {
    dispatch(deleteHint(v4id));
  }, 5000);
};
