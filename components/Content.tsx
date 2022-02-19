interface IProps {
  children: React.ReactNode;
}

const Content: React.FC<IProps> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};

export default Content;
