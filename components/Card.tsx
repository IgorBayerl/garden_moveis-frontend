import Category from "./Category";

interface IProps {
  item: IItem;
}

export interface IItem {
  attributes: IAttributes;
}
interface IAttributes {
  categories?: ICategoriesData;
  name: string;
  price?: number;
  pictures?: IPicturesData;
  stock?: number;
}

interface ICategoriesData {
  data: any[];
}

interface CategoryAttributes {
  name: string;
}

interface IPicturesData {
  data: any[];
}

const Card: React.FC<IProps> = ({ item }) => {
  return (
    <div className="max-w-sm py-6 break-inside-avoid">
      <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg teste-shaddow  ">
        <img
          className="w-full"
          src={
            "http://localhost:1337" +
            item.attributes.pictures?.data[0]?.attributes.url
          }
          // alt="Imagem não encontrada"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "/no-image.png";
          }}
        />
      </div>
      <div className="px-2 py-2 font-bold sm:text-lg text-sm ">
        {item?.attributes?.name}
      </div>
      <div className=" pb-2">
        {item?.attributes?.categories?.data?.map((item) => (
          <Category>{item?.attributes.name}</Category>
        ))}
        <Category>Mesa</Category>
        <Category sellected={true}>Dobravel</Category>
        <Category>winter</Category>
      </div>
    </div>
  );
};

export default Card;
