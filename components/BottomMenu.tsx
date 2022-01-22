import Image from "next/image";

const BottomMenu: React.FC = () => {
  return (
    <nav className="flex sm:hidden mx-10 z-50 my-10 h-20 justify-evenly bg-slate-100 rounded-full fixed bottom-0 left-0 right-0">
      <div className="flex items-center">
        <h1>C</h1>
      </div>
      <div className="flex items-center">
        <h1>G</h1>
      </div>
    </nav>
  );
};

export default BottomMenu;
