import { useCallback, useContext, useEffect } from "react";
import { GlobalDataContext } from "./Context";
import { ICategory } from "./../interfaces/data";

interface Props {
  children: string;
  sellected?: boolean;
  itemId: string;
}

const Category: React.FC<Props> = ({ children, sellected = false, itemId }) => {
  const { toggleCategoryFilter } = useContext(GlobalDataContext);
  const onClickHandler = (tag: string) => {
    toggleCategoryFilter(tag);
  };

  if (sellected) {
    return (
      <span
        onClick={() => onClickHandler(itemId)}
        className="cursor-pointer inline-block bg-verde-1 text-white rounded-full px-3 py-1 text-sm sm:text-sm font-semibold mx-1 mb-2"
      >
        {children}
      </span>
    );
  } else {
    return (
      <span
        onClick={() => onClickHandler(itemId)}
        className="cursor-pointer inline-block font-semibold bg-gray-300 rounded-full px-3 py-1 text-sm sm:text-sm text-gray-700 mx-1 mb-2"
      >
        {children}
      </span>
    );
  }
};

export default Category;
