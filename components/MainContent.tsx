import Image from "next/image";
import Card from "./Card";

const MainContent: React.FC = ({ children }) => {
  return (
    <div className="overflow-y-auto w-full flex justify-center">{children}</div>
  );
};

export default MainContent;
