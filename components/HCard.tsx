interface IProps {
  title: string;
  children: React.ReactNode;
}

const HCard: React.FC<IProps> = ({ title, children }) => {
  return (
    <div>
      {title}
      {children}
    </div>
  );
};

export default HCard;
