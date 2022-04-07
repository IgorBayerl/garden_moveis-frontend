import Link from "next/link";
import { ICategory, IProduct } from "../interfaces/data";
import Category from "./Category";
import NoActionCategory from "./NoActionCategory";

interface IProps {
  item: IProduct;
}

const NewHCard: React.FC<IProps> = ({ item }) => {
  return (
    <Link href={`/product/${item.id}`}>
      <div className=" h-full new-hcard-container bordinha-cinza mx-3 cursor-pointer">
        <div className="flex h-[70%] justify-center align-middle"></div>
        <div className=" pl-2 h-[30%] border-t-2 pt-2">
          <div className="mx-1">{item?.title}</div>
          <br />
          {item?.categories?.map((item: ICategory) => (
            <NoActionCategory key={item.id}>{item.title}</NoActionCategory>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default NewHCard;

/*
<>
    <Link href={`/product/${item.id}`}>
    <img
        className=" cursor-pointer rounded-2xl sm:img-hcard-hover hCard-img"
        src={item.pictures[0].url}
        alt={`Imagem do produto: ${item.title}`}
        onError={({ currentTarget }) => {
        currentTarget.onerror = null; //prevents looping
        currentTarget.src = "/no-image.png";
        }}
    />
    </Link>
    <div className="">
    <div className="px-2 py-2 min-w-[10rem] font-bold sm:text-lg text-sm ">
        {item?.title}
    </div>
    <div className="flex flex-col  pb-2 justify-start ">
        {item?.categories?.map((item: ICategory) => (
        <NoActionCategory key={item.id}>{item.title}</NoActionCategory>
        ))}
    </div>
    </div>
    <div className="v-spacer" />
</>
*/
