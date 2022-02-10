import Category from "./Category";
import { IProduct, ICategory } from "../interfaces/data";

interface IProps {
  item: IProduct;
}

const Card: React.FC<IProps> = ({ item }) => {
  return (
    <div className="max-w-sm py-6 break-inside-avoid">
      <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg teste-shaddow  ">
        <img
          className="w-full"
          src={"http://localhost:3000/_next/image?url=%2Flogo.png&w=256&q=75"}
          // alt="Imagem não encontrada"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "/no-image.png";
          }}
        />
      </div>
      <div className="px-2 py-2 font-bold sm:text-lg text-sm ">
        {item?.title}
      </div>
      <div className=" pb-2">
        {item?.categories?.map((item: ICategory) => (
          <Category>{item.title}</Category>
        ))}
      </div>
    </div>
  );
};

export default Card;
