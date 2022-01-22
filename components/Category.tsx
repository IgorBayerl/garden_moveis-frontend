interface Props {
  children: React.ReactNode;
  sellected?: boolean;
}

const Category: React.FC<Props> = ({ children, sellected = false }) => {
  if (sellected) {
    return (
      <span className="inline-block bg-green-600 text-white rounded-full px-3 py-1 text-xs sm:text-sm font-semibold mr-2 mb-2">
        {children}
      </span>
    );
  } else {
    return (
      <span className="inline-block font-semibold bg-gray-300 rounded-full px-3 py-1 text-xs sm:text-sm text-gray-700 mr-2 mb-2">
        {children}
      </span>
    );
  }
};

export default Category;
