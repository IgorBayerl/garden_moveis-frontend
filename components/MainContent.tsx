import { useCallback, useEffect, useRef, useState } from "react";

interface IProps {
  children: React.ReactNode;
  setScrollDirection: (direction: number) => void;
}

const MainContent: React.FC<IProps> = ({ children, setScrollDirection }) => {
  const refContainer = useRef<any>(null);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  const handleScroll = useCallback(() => {
    if (refContainer.current.scrollTop > lastScrollPosition) {
      if (refContainer.current.scrollTop > lastScrollPosition + 10) {
        // quando no ios existe um efeito de mola ao chegar no topo da pagina, isso evita que o menu feche com esse efeito
        setScrollDirection(1);
      }
    } else {
      setScrollDirection(0);
    }
    setLastScrollPosition(refContainer.current.scrollTop);
  }, [lastScrollPosition]);

  return (
    <div
      onScroll={() => handleScroll()}
      ref={refContainer}
      className="pb-28 sm:pb-0 overflow-y-auto w-full flex justify-center"
    >
      {children}
    </div>
  );
};

export default MainContent;
