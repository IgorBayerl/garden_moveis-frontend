import Category from "./Category";
import { IProduct, ICategory } from "../interfaces/data";
import Link from "next/link";

interface IProps {
  item: IProduct;
}

const Card: React.FC<IProps> = ({ item }) => {
  const handleClick = (id: string) => {
    console.log(id);
  };
  return (
    <div className="hover-shadow max-w-sm py-2 break-inside-avoid">
      <Link href={`/product/${item.id}`}>
        <a>
          <div className="cursor-pointer max-w-sm rounded-2xl overflow-hidden test-shaddow shadow-lg   ">
            <img
              className="w-full "
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
          <Category
            onClickFunction={handleClick}
            key={item.id}
            itemId={item.id}
          >
            {item.title}
          </Category>
        ))}
      </div>
    </div>
  );
};

export default Card;
