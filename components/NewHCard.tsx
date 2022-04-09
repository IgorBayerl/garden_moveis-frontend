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
