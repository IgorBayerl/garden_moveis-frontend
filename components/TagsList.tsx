import { useCallback, useEffect, useRef, useState } from "react";
import Category from "./Category";

interface IProps {
  scrollDirection: number;
}

const TagsList: React.FC<IProps> = ({ scrollDirection }) => {
  const refContainer = useRef<any>(null);
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagsArray, setTagsArray] = useState([
    { id: "1", selected: false, title: "Mesa" },
    { id: "2", selected: false, title: "Banqueta" },
    { id: "3", selected: false, title: "Sofá" },
    { id: "4", selected: false, title: "Cadeira" },
    { id: "5", selected: true, title: "Mesa" },
    { id: "6", selected: false, title: "Banqueta" },
    { id: "7", selected: false, title: "Sofá" },
    { id: "8", selected: false, title: "Cadeira" },
    { id: "9", selected: false, title: "Mesa" },
    { id: "10", selected: false, title: "Banqueta" },
    { id: "11", selected: false, title: "Sofá" },
    { id: "12", selected: false, title: "AAA" },
    { id: "13", selected: false, title: "VVVV" },
    { id: "14", selected: false, title: "Sofá" },
    { id: "15", selected: false, title: "Cadeira" },
    { id: "16", selected: false, title: "Mesa" },
    { id: "17", selected: false, title: "Banqueta" },
    { id: "18", selected: false, title: "Sofá" },
    { id: "19", selected: false, title: "AAA" },
    { id: "20", selected: false, title: "VVVV" },
  ]);

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

  useEffect(() => {
    console.log(scrollDirection);
  }, [scrollDirection]);

  const handleClick = (id: string) => {
    const newTagsArray = tagsArray.map((tag) => {
      if (tag.id === id) {
        return { ...tag, selected: !tag.selected };
      }
      return tag;
    });
    setTagsArray(newTagsArray);
  };

  return (
    <nav className="pt-2 flex w-full max-w-[1400px] justify-center  ">
      <div
        ref={refContainer}
        // onWheel={(e) => horizontalScrollWheel(e)}
        className="horizontalScroll  "
      >
        {tagsArray.map((tag) => (
          <Category
            onClickFunction={handleClick}
            key={tag.id}
            itemId={tag.id}
            sellected={tag.selected}
          >
            {tag.title}
          </Category>
        ))}
        {/* <Category sellected={true}>test</Category>
        <Category sellected={true}>AAAA</Category>
        <Category>test</Category>
        <Category>BBBB</Category>
        <Category>CADEIRA</Category>
        <Category>POLTRONA</Category>
        <Category>BANQUETA</Category>
        <Category>MESA</Category>
        <Category>REDONDA</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>BBBB</Category>
        <Category>CADEIRA</Category>
        <Category>POLTRONA</Category>
        <Category>BANQUETA</Category>
        <Category>MESA</Category>
        <Category>REDONDA</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>test</Category>
        <Category>test</Category> */}
      </div>
    </nav>
  );
};

export default TagsList;
