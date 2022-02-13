import { useCallback, useEffect, useRef, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

const MainContent: React.FC<IProps> = ({ children }) => {
  return (
    <div className="pb-28 sm:pb-0 overflow-y-auto w-full flex justify-center">
      {children}
    </div>
  );
};

export default MainContent;
