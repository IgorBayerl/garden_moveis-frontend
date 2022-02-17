import React from "react";
import Card from "./Card";
import { IProduct } from "../interfaces/data";

interface Props {
  children?: React.ReactNode;
  items: IProduct[];
}

const Columns: React.FC<Props> = ({ items }) => {
  // console.log(items);
  return (
    // <div className="columns-2 sm:columns-3 px-9 sm:px-5 lg:columns-5 gap-3 lg:gap-6 w-[1400px] mx-auto space-y-3 pb-28">
    //   {items?.map((item) => (
    //     <Card key={item.id} item={item}></Card>
    //   ))}
    // </div>
    <div className="columns-2 sm:columns-3 px-2 sm:px-5 lg:columns-5  w-[1400px] mx-auto space-y-2 h-fit ">
      {items?.map((item) => (
        <Card key={item.id} item={item}></Card>
      ))}
    </div>
  );
};

export default Columns;
