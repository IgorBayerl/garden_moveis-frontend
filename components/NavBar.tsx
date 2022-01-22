import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <nav className="flex w-full navbar navbar-expand-lg sm:justify-between justify-center px-10 navbar-light bg-slate-100">
      <div className="flex items-center">
        <Image src={"/logo.png"} alt="logo" height={80} width={184} />
        <h1>Garden Moveis</h1>
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
