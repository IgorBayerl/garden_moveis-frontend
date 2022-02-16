import Image from "next/image";
import { SearchIcon, ChatIcon } from "@heroicons/react/solid";
import { useEffect, useLayoutEffect, useState } from "react";

interface IProps {
  scrollDirection: number;
}
const BottomMenu: React.FC<IProps> = ({ scrollDirection }) => {
  const [visibleClass, setVisibleClass] = useState<string>("");
  useEffect(() => {
    setVisibleClass(scrollDirection === 0 ? "" : "hide-bottom-menu");
  }, [scrollDirection]);

  return (
    <nav
      className={`${visibleClass} bottom-menu flex sm:hidden mx-10 z-50 shadow-md my-10 h-16 justify-evenly bg-white rounded-full fixed bottom-0 `}
    >
      <div className="flex items-center">
        <ChatIcon className="cursor-pointer  h-12 w-12 p-2 m-6 text-gray-500" />
      </div>
      <div className="flex items-center">
        <SearchIcon className="cursor-pointer h-12 w-12 p-2 m-6 text-gray-500" />
      </div>
    </nav>
  );
};

export default BottomMenu;
