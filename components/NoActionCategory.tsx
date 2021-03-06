interface Props {
  children: string;
  sellected?: boolean;
}

const NoActionCategory: React.FC<Props> = ({ children, sellected = true }) => {
  if (sellected) {
    return (
      <span className="max-w-fit inline-block bg-verde-1 text-white rounded-full px-3 py-1 text-sm sm:text-sm font-semibold mx-1 mb-2">
        {children}
      </span>
    );
  } else {
    return (
      <span className="max-w-fit inline-block font-semibold bg-gray-300 rounded-full px-3 py-1 text-sm sm:text-sm text-gray-700 mx-1 mb-2">
        {children}
      </span>
    );
  }
};

export default NoActionCategory;
