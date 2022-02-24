import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Category from "./Category";

import { GlobalDataContext } from "./Context";
import { ICategory } from "./../interfaces/data";

interface IProps {
  scrollDirection: number;
}

const TagsList: React.FC<IProps> = ({ scrollDirection }) => {
  const { globalCategoriesData } = useContext(GlobalDataContext);

  const refContainer = useRef<any>(null);
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const horizontalScrollWheel = useCallback((e: any) => {
    e.preventDefault();
    if (refContainer.current) {
      refContainer.current.scrollLeft += e.deltaY;
    }
  }, []);

  useEffect(() => {
    const myRef = refContainer.current;
    myRef.addEventListener("wheel", horizontalScrollWheel, {
      passive: false,
    });
    return () =>
      myRef.removeEventListener("wheel", horizontalScrollWheel, {
        passive: false,
      });
  }, []);

  // useEffect(() => {
  //   console.log(scrollDirection);
  // }, [scrollDirection]);

  return (
    <nav className="pt-2 flex w-full max-w-[1400px] justify-center sticky-top bg-white  ">
      <div
        ref={refContainer}
        // onWheel={(e) => horizontalScrollWheel(e)}
        className="horizontalScroll sm:hideScroll "
      >
        {globalCategoriesData.map((category: ICategory) => (
          <Category
            key={category.id}
            itemId={category.id}
            sellected={category.selected}
          >
            {category.title}
          </Category>
        ))}
      </div>
    </nav>
  );
};

export default TagsList;
