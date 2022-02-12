import { useCallback, useEffect, useRef, useState } from "react";
import Category from "./Category";

interface IProps {
  scrollDirection: number;
}

const TagsList: React.FC<IProps> = ({ scrollDirection }) => {
  const refContainer = useRef<any>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const horizontalScrollWheel = useCallback((e: any) => {
    if (refContainer.current) {
      refContainer.current.scrollLeft += e.deltaY;
    }
  }, []);

  useEffect(() => {
    console.log(scrollDirection);
  }, [scrollDirection]);

  return (
    <nav className="pt-2 w-full   bg-slate-500 fixed top-0 left-0 right-0">
      <div
        ref={refContainer}
        onWheel={(e) => horizontalScrollWheel(e)}
        className="horizontalScroll"
      >
        <Category sellected={true}>test</Category>
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
      </div>
    </nav>
  );
};

export default TagsList;
