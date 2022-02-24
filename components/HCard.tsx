import Link from "next/link";
import { ICategory, IProduct } from "../interfaces/data";
import Category from "./Category";
import NoActionCategory from "./NoActionCategory";

interface IProps {
  item: IProduct;
}

const HCard: React.FC<IProps> = ({ item }) => {
  return (
    <div className=" max-w-sm py-2 break-inside-avoid ">
      <Link href={`/product/${item.id}`}>
        <a>
          <div className="cursor-pointer max-w-sm rounded-2xl overflow-hidden ">
            <img
              className="w-full img-card sm:img-card-hover"
              src={item.pictures[0].url}
              alt={`Imagem do produto: ${item.title}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/no-image.png";
              }}
            />
          </div>
        </a>
      </Link>
      <div className="px-2 py-2 font-bold sm:text-lg text-sm ">
        {item?.title}
      </div>
      <div className=" pb-2">
        {item?.categories?.map((item: ICategory) => (
          <NoActionCategory key={item.id}>{item.title}</NoActionCategory>
        ))}
      </div>
    </div>
  );
};

export default HCard;
