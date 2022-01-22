import Image from "next/image";
import Card from "./Card";
import Typography from "./Topography";

const MainContent: React.FC = ({ children }) => {
  return (
    <div className="overflow-y-auto w-full flex justify-center">{children}</div>
  );
};

export default MainContent;
