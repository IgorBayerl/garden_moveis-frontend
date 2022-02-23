import Navbar from "../components/NavBar";
import BottomMenu from "../components/BottomMenu";
import Columns from "../components/Columns";
import MainContent from "../components/MainContent";

import { useCallback, useEffect, useRef, useState } from "react";
// import { GET_HOME_PAGE_DATA } from "../graphql/queries";
import { gql, GraphQLClient } from "graphql-request";
import { IData, IProduct } from "../interfaces/data";
import TagsList from "./../components/TagsList";

import { GlobalDataContext } from "../components/Context";
import { ICategory } from "./../interfaces/data";
import Category from "./../components/Category";
import Masonry from "../components/Masonry";

interface IProps {
  data: IProduct;
}

export const getStaticProps = async () => {
  const url = `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_API_KEY}`,
    },
  });
  const query = gql`
    {
      productsOrders {
        products {
          id
          title
          description
          pictures {
            url
          }
          categories {
            id
            title
          }
        }
      }
      categoryOrders {
        categories {
          id
          title
        }
      }
    }
  `;
  const rawData = await graphQLClient.request(query);
  const data = {
    products: rawData.productsOrders[0].products,
    categories: rawData.categoryOrders[0].categories,
  };
  return {
    props: { data },
  };
};

const Home: React.FC<IProps> = ({ data }) => {
  const [productsData, setProductsData] = useState<IProduct[]>(data.products);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [offset, setOffset] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<number>(0);

  /* Manage global data */
  const [globalCategoriesData, setGlobalCategoriesData] = useState<ICategory[]>(
    data.categories
  );

  useEffect(() => {
    // fetchData(); // filter data with api
    updateDataWithFilters(); // filter data with javascript
  }, [globalCategoriesData]);

  const fetchData = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`;
      const graphQLClient = new GraphQLClient(url, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_API_KEY}`,
        },
      });

      const queryArr = globalCategoriesData
        .filter((category) => category.selected)
        .map((category: ICategory) => category.title);

      let query = gql``;
      // console.log(queryArr);
      if (queryArr.length > 0) {
        query = gql`
        {
          productsOrders {
            products(where: { categories_some: { title_in: ${JSON.stringify(
              queryArr
            )} } }) {
              id
              title
              description
              pictures {
                url
              }
              categories {
                id
                title
              }
            }
          }
        }
        `;
      } else {
        query = gql`
          {
            productsOrders {
              products {
                id
                title
                description
                pictures {
                  url
                }
                categories {
                  id
                  title
                }
              }
            }
            categoryOrders {
              categories {
                id
                title
              }
            }
          }
        `;
      }

      // console.log(query);
      const rawData = await graphQLClient.request(query);
      setProductsData(rawData.productsOrders[0].products);
    } catch (error) {
      alert(error);
    }
  };

  const updateDataWithFilters = useCallback(() => {
    const queryArr = globalCategoriesData
      .filter((category) => category.selected)
      .map((category: ICategory) => category.title);

    /// Refazer isso aqui de forma mais elegante
    if (queryArr.length === 0) {
      setProductsData(data.products);
      return;
    } else {
      let newArr: IProduct[] = [];
      data.products.forEach((product) => {
        let isSelected = false;
        product.categories.forEach((category) => {
          if (queryArr.includes(category.title)) isSelected = true;
        });
        if (isSelected) newArr.push(product);
      });
      setProductsData(newArr);
      return;
    }
  }, [globalCategoriesData, data]);

  const addSelectedToGlobalCategoryData = useCallback(() => {
    const newArr = globalCategoriesData.map((obj) => ({
      ...obj,
      selected: false,
    }));
    setGlobalCategoriesData(newArr);
  }, []);

  const toggleCategoryFilter = useCallback((id: any) => {
    const newArr = globalCategoriesData.map((obj) => {
      if (obj.id === id) {
        let newObj = obj;
        newObj.selected = !obj.selected;
        return newObj;
      }
      return obj;
    });

    setGlobalCategoriesData(newArr);
  }, []);

  /* End of manage global data */

  useEffect(() => {
    if (offset > lastScrollPosition) {
      // quando no ios existe um efeito de mola ao chegar no topo da pagina, isso evita que o menu feche com esse efeito
      if (offset > lastScrollPosition + 100) {
        setScrollDirection(1);
        setLastScrollPosition(offset);
      }
    } else {
      setScrollDirection(0);
      setLastScrollPosition(offset);
    }
  }, [offset]);

  useEffect(() => {
    addSelectedToGlobalCategoryData();
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <GlobalDataContext.Provider
      value={{ globalCategoriesData, toggleCategoryFilter }}
    >
      <div className="flex flex-col items-center ">
        <Navbar></Navbar>
        <BottomMenu scrollDirection={scrollDirection}></BottomMenu>
        <TagsList scrollDirection={scrollDirection}></TagsList>
        <MainContent>
          <Masonry items={productsData}></Masonry>
        </MainContent>
      </div>
    </GlobalDataContext.Provider>
  );
};

export default Home;
