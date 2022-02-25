import Link from "next/link";
import { ICategory, IProduct } from "../interfaces/data";
import Category from "./Category";
import NoActionCategory from "./NoActionCategory";

interface IProps {
  item: IProduct;
}

const HCard: React.FC<IProps> = ({ item }) => {
  return (
    <div className=" h-full bg-red-400 mx-2 py-2 flex break-inside-avoid HCard">
      <div className="w-fit h-full bg-gray-500">
        <Link href={`/product/${item.id}`}>
          <img
            className="  object-contain "
            src={item.pictures[0].url}
            alt={`Imagem do produto: ${item.title}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/no-image.png";
            }}
          />
        </Link>
        {/* <div className="">{item?.title}</div> */}
      </div>
      <div className=" ">
        {item?.categories?.map((item: ICategory) => (
          <NoActionCategory key={item.id}>{item.title}</NoActionCategory>
        ))}
      </div>
    </div>
  );
  // return (
  //   <div className=" max-w-sm py-2 break-inside-avoid HCard">
  //     <Link href={`/product/${item.id}`}>
  //       <a>
  //         <div className="cursor-pointer max-w-sm rounded-2xl overflow-hidden ">
  //           <img
  //             className="h-full img-card sm:img-card-hover"
  //             src={item.pictures[0].url}
  //             alt={`Imagem do produto: ${item.title}`}
  //             onError={({ currentTarget }) => {
  //               currentTarget.onerror = null; // prevents looping
  //               currentTarget.src = "/no-image.png";
  //             }}
  //           />
  //         </div>
  //       </a>
  //     </Link>
  //     <div className="px-2 py-2 font-bold sm:text-lg text-sm ">
  //       {item?.title}
  //     </div>
  //     <div className=" pb-2">
  //       {item?.categories?.map((item: ICategory) => (
  //         <NoActionCategory key={item.id}>{item.title}</NoActionCategory>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default HCard;
