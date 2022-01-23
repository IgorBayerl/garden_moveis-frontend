import React from "react";
import Card, { IItem } from "./Card";

interface Props {
  children?: React.ReactNode;
  items: IItem[];
}

const Columns: React.FC<Props> = ({ items }) => {
  console.log(items);
  return (
    <div className="columns-2 sm:columns-3 px-9 sm:px-5 lg:columns-5 gap-3 lg:gap-6 w-[1400px] mx-auto space-y-3 pb-28">
      {items?.map((item) => (
        <Card item={item}></Card>
      ))}
    </div>
  );
};

export default Columns;
