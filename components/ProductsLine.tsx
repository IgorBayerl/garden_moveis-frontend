interface IProps {
  title: string;
  children: React.ReactNode;
}

const ProductsLine: React.FC<IProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl py-2 font-semibold">{title}</h1>
      <div className="spacer my-3" />
      <div className="horizontalScrollContainer py-2 ">
        <div className="bg-blue-600 h-1 w-full"></div>
        {children}
      </div>
    </div>
  );
};

export default ProductsLine;
