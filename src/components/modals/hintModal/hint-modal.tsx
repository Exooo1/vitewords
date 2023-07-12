import { FC, useEffect, useState } from "react";
import { useActions, useAppSelector } from "../../../redux/reduxUtils";
import { HintsType, slice } from "../../../redux/errorsReducer";
import done from "../../../assets/images/done.png";
import error from "../../../assets/images/error.png";
import styles from "./hintmodal.module.scss";
import {Hint} from "./hint";

type TIsRemoved = {
  isRemoved?: boolean;
};

export const HintModal: FC = () => {

  const { deleteHint } = useActions(slice.actions);
  const hints = useAppSelector(state => state.errorsReducer.errors);
  const [test, setTest] = useState<Array<HintsType & TIsRemoved>>([]);
  useEffect(() => {
    setTest(hints);
  }, [hints]);
  const removeHint = (id: string) => {
    setTest(
      test.map(item => (item.id === id ? { ...item, isRemoved: true } : item))
    );
    setTimeout(() => {
      deleteHint(id);
    }, 700);
  };

  const resultHits = test.map((item) => {
    return <Hint key={item.id} removeHint={()=>removeHint(item.id)} {...item} imgStatus={error} />
  });

  return <div className={styles.hints}>{resultHits}</div>;
};
