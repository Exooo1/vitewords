import React from "react";

type SortElementType = {
  name: string;
  sortElem: () => void;
  isLoading: boolean;
};
export const SortElement = ({ name, sortElem, isLoading }: SortElementType) => {
  return (
    <button onClick={sortElem} disabled={isLoading}>
      {name}
    </button>
  );
};
