interface IProps {
  children: React.ReactNode;
}

const Content: React.FC<IProps> = ({ children }) => {
  return (
    <div className="w-full  h-full px-2  bg-slate-200 max-w-[1400px]">
      {children}
    </div>
  );
};

export default Content;
