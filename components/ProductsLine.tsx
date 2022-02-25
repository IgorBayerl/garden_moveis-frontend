interface IProps {
  title: string;
  children: React.ReactNode;
}

const ProductsLine: React.FC<IProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl py-2 font-semibold">{title}</h1>
      <div className="spacer my-3" />
      <div className="flex h-80 bg-slate-300  w-fit">{children}</div>
    </div>
  );
};

export default ProductsLine;
