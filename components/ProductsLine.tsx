interface IProps {
  title: string;
  children: React.ReactNode;
}

const ProductsLine: React.FC<IProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl py-2">{title}</h1>
      <div className="spacer my-3" />
      {children}
    </div>
  );
};

export default ProductsLine;
