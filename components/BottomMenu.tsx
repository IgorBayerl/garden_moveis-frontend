import Image from "next/image";
import { SearchIcon, ChatIcon } from "@heroicons/react/solid";

const BottomMenu: React.FC = () => {
  return (
    <nav className="flex sm:hidden mx-10 z-50 my-10 h-16 justify-evenly bg-slate-100 rounded-full fixed bottom-0 left-0 right-0">
      <div className="flex items-center">
        <ChatIcon className="cursor-pointer h-10 w-10 text-gray-500" />
      </div>
      <div className="flex items-center">
        <SearchIcon className="cursor-pointer h-10 w-10 text-gray-500" />
      </div>
    </nav>
  );
};

export default BottomMenu;
