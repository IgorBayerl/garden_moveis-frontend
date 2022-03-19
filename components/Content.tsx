import Footer from "./Footer";

interface IProps {
  children: React.ReactNode;
}

const Content: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <div className="w-full  px-2 max-w-[1400px]">{children}</div>
      <Footer></Footer>
    </>
  );
};

export default Content;
