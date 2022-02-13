interface IProps {
  children: React.ReactNode;
}

const Content: React.FC<IProps> = ({ children }) => {
  return <div className="">{children}</div>;
};

export default Content;
