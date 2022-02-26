import Image from "next/image";
import {
  SearchIcon,
  ChatIcon,
  MailIcon,
  HomeIcon,
} from "@heroicons/react/solid";
import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";

interface IProps {
  scrollDirection: number;
  currentPage: string;
}
const BottomMenu: React.FC<IProps> = ({
  scrollDirection,
  currentPage = "",
}) => {
  const [visibleClass, setVisibleClass] = useState<string>("");
  useEffect(() => {
    setVisibleClass(scrollDirection === 0 ? "" : "hide-bottom-menu");
  }, [scrollDirection]);

  return (
    <nav
      className={`${visibleClass} bottom-menu flex sm:hidden  z-50 shadow-md my-4 h-16 justify-evenly bg-white rounded-full fixed bottom-0 `}
    >
      <div className="flex items-center">
        <Link href="/">
          <HomeIcon
            className={`cursor-pointer  h-12 w-12 p-2 m-6 ${
              currentPage == "home" ? "text-black" : "text-gray-500"
            }`}
          />
        </Link>
      </div>
      <div className="flex items-center">
        <Link href="/contact">
          <MailIcon
            className={`cursor-pointer  h-12 w-12 p-2 m-6 ${
              currentPage == "contact" ? "text-black" : "text-gray-500"
            }`}
          />
        </Link>
      </div>
    </nav>
  );
};

export default BottomMenu;
