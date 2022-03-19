import Category from "./Category";
import { IProduct, ICategory } from "../interfaces/data";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";
import { GlobalDataContext } from "./Context";
interface IProps {
  item: IProduct;
}

const Card: React.FC<IProps> = ({ item }) => {
  const { globalCategoriesData } = useContext(GlobalDataContext);

  const isSelected = useCallback(
    (id: string) => {
      if (globalCategoriesData.find((item: ICategory) => item.id === id)) {
        return globalCategoriesData.find((item: ICategory) => item.id === id)
          .selected;
      }
    },
    [globalCategoriesData]
  );

  return (
    <div className=" max-w-sm py-2 break-inside-avoid masonry-content">
      <Link href={`/product/${item.id}`}>
        <a>
          <div className="cursor-pointer max-w-sm rounded-2xl overflow-hidden ">
            <Image
              className="w-full img-card sm:img-card-hover"
              src={item.pictures[0].url}
              alt={`Imagem do produto: ${item.title}`}
              width={item.pictures[0].width}
              height={item.pictures[0].height}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/no-image.png";
              }}
            />
            {/* <img
              className="w-full img-card sm:img-card-hover"
              src={item.pictures[0].url}
              alt={`Imagem do produto: ${item.title}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/no-image.png";
              }}
            /> */}
          </div>
        </a>
      </Link>
      <div className="px-2 py-2 font-bold sm:text-lg text-sm ">
        {item?.title}
      </div>
      <div className=" pb-2">
        {item?.categories?.map((item: ICategory) => (
          <Category
            key={item.id}
            itemId={item.id}
            sellected={isSelected(item.id)}
          >
            {item.title}
          </Category>
        ))}
      </div>
    </div>
  );
};

export default Card;
