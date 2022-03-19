import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { GlobalDataContext } from "./Context";
import { HiMail } from "react-icons/hi";
import { FiMail } from "react-icons/fi";

//Mkae
const Navbar: React.FC = () => {
  const { globalCategoriesData } = useContext(GlobalDataContext);
  return (
    <div className="w-full bg-white  flex justify-center ">
      <nav className="flex w-full  max-w-[1400px] navbar navbar-expand-lg sm:justify-between justify-center px-10 py-2 navbar-light ">
        <div className="flex items-center ">
          <Link href="/">
            <a className="flex items-center ">
              <Image src={"/logo.svg"} alt="logo" height={90} width={90} />

              <h1 className="sm:text-3xl text-2xl mx-5 font-bold whitespace-nowrap">
                Garden Moveis
              </h1>
            </a>
          </Link>
        </div>

        <div className="hidden sm:flex  align-middle  ">
          <Link href="/contact">
            <a className="flex text-xl px-3  text-icon-align text-icon-align-btn">
              <FiMail />
              Contato
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
