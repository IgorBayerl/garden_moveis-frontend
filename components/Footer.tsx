import Image from "next/image";
import Link from "next/link";
import { FiMail, FiHome } from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <div className="w-full hidden md:flex bg-white test-shaddow   justify-center ">
      <nav className="flex w-full  max-w-[1400px] navbar navbar-expand-lg sm:justify-between justify-center px-10 py-2 navbar-light ">
        <div className="flex items-center ">
          <Link href="/">
            <a>
              <Image src={"/logo.svg"} alt="logo" height={60} width={60} />
            </a>
          </Link>
          <h1 className="sm:text-2xl text-xl mx-5 font-bold whitespace-nowrap">
            Garden Moveis
          </h1>
        </div>
        <div className=" sm:flex  align-middle  ">
          <Link href="/contact">
            <a className="flex text-xl px-3  text-icon-align ">
              <FiHome />
              Inicio
            </a>
          </Link>
          <Link href="/contact">
            <a className="flex text-xl px-3  text-icon-align ">
              <FiMail />
              Contato
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Footer;
