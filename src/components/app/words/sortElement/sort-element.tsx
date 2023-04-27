import { FC } from "react";

type SortElementType = {
  name: string;
  sortElem: () => void;
  isLoading: boolean;
};
export const SortElement: FC<SortElementType> = ({
  name,
  sortElem,
  isLoading
}) => {
  return (
    <button onClick={sortElem} disabled={isLoading}>
      {name}
    </button>
  );
};
