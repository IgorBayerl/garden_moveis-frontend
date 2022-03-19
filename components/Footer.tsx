import Image from "next/image";
import Link from "next/link";
import { FiMail, FiHome } from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <div className="w-full md:flex bg-white test-shaddow  footerContainer justify-center ">
      <nav className="flex w-full flex-col md:flex-row  max-w-[1400px] navbar navbar-expand-lg justify-center items-center sm:justify-between  px-10 py-5 navbar-light ">
        <div className="flex items-center ">
          <span>
            2022 - {new Date().getFullYear()} © Garden Moveis - Todos os
            direitos reservados
          </span>
        </div>
        <span>Desenvolvido por Igor Bayerl!</span>
      </nav>
    </div>
  );
};

export default Footer;
