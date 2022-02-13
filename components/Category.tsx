import { useContext } from "react";
import { SelectedTagsContext } from "./Context";

interface Props {
  children: string;
  sellected?: boolean;
  onClickFunction: (id: string) => void;
  itemId: string;
}

const Category: React.FC<Props> = ({
  children,
  sellected = false,
  onClickFunction,
  itemId,
}) => {
  const { setSelectedTags } = useContext(SelectedTagsContext);
  const onClickHandler = (tag: string) => {
    setSelectedTags(tag);
    console.log(`clicked ${tag}`);
  };

  // const handleClick = (id: string) => {
  //   const newTagsArray = tagsArray.map((tag) => {
  //     if (tag.id === id) {
  //       return { ...tag, selected: !tag.selected };
  //     }
  //     return tag;
  //   });
  //   setTagsArray(newTagsArray);
  // };

  if (sellected) {
    return (
      <span
        onClick={() => onClickFunction(itemId)}
        className="cursor-pointer inline-block bg-green-600 text-white rounded-full px-3 py-1 text-sm sm:text-sm font-semibold mx-1 mb-2"
      >
        {children}
      </span>
    );
  } else {
    return (
      <span
        onClick={() => onClickFunction(itemId)}
        className="cursor-pointer inline-block font-semibold bg-gray-300 rounded-full px-3 py-1 text-sm sm:text-sm text-gray-700 mx-1 mb-2"
      >
        {children}
      </span>
    );
  }
};

export default Category;
