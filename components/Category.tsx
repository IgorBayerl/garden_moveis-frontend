import { useContext } from "react";
import { SelectedTagsContext } from "./Context";

interface Props {
  children: string;
  sellected?: boolean;
}

const Category: React.FC<Props> = ({ children, sellected = false }) => {
  const { selectedTags, setSelectedTags } = useContext(SelectedTagsContext);
  const onClickHandler = (tag: string) => {
    setSelectedTags(tag);
    console.log(`clicked ${tag}`);
  };
  if (sellected) {
    return (
      <span
        onClick={() => onClickHandler(children)}
        className="cursor-pointer inline-block bg-green-600 text-white rounded-full px-3 py-1 text-xs sm:text-sm font-semibold mr-2 mb-2"
      >
        {children}
      </span>
    );
  } else {
    return (
      <span
        onClick={() => onClickHandler(children)}
        className="cursor-pointer inline-block font-semibold bg-gray-300 rounded-full px-3 py-1 text-xs sm:text-sm text-gray-700 mr-2 mb-2"
      >
        {children}
      </span>
    );
  }
};

export default Category;
