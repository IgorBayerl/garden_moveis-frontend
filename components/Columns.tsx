import Image from "next/image";
import Card from "./Card";

const Columns: React.FC = () => {
  return (
    <nav className="">
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </nav>
  );
};

export default Columns;
