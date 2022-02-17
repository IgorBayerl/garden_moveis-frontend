import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { GlobalDataContext } from "./Context";

const Navbar: React.FC = () => {
  const { globalCategoriesData } = useContext(GlobalDataContext);
  return (
    <nav className="flex w-full max-w-[1400px] navbar navbar-expand-lg sm:justify-between justify-center px-10 navbar-light ">
      <div className="flex items-center ">
        <Link href="/">
          <a>
            <Image src={"/logo.png"} alt="logo" height={80} width={184} />
          </a>
        </Link>
        <h1 className="sm:text-2xl text-2xl mx-5 font-bold whitespace-nowrap">
          Garden Moveis
        </h1>
      </div>
      <div className="hidden sm:block">
        <div>
          <h1>Contato</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
