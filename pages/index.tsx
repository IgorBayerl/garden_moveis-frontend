import Navbar from "../components/NavBar";
import BottomMenu from "../components/BottomMenu";
import Columns from "../components/Columns";
import MainContent from "../components/MainContent";

import { useCallback, useEffect, useRef, useState } from "react";
// import { GET_HOME_PAGE_DATA } from "../graphql/queries";
import { gql, GraphQLClient } from "graphql-request";
import { IProduct } from "../interfaces/data";
import TagsList from "./../components/TagsList";

import { SelectedTagsContext } from "../components/Context";

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
      products(where: { categories_some: { title_in: ["Mesa", "Banqueta"] } }) {
        id
        title
        description
        pictures {
          url
        }
        categories {
          title
        }
      }
      categories {
        title
      }
    }
  `;
  const data = await graphQLClient.request(query);
  return {
    props: { data },
  };
};

const Home: React.FC<IProps> = ({ data }) => {
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [offset, setOffset] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<number>(0);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <SelectedTagsContext.Provider value={{ selectedTags, setSelectedTags }}>
      <div className="flex flex-col items-center ">
        <Navbar></Navbar>
        <BottomMenu scrollDirection={scrollDirection}></BottomMenu>
        <TagsList scrollDirection={scrollDirection}></TagsList>
        {/* <MainContent setScrollDirection={setScrollDirection}> */}
        <MainContent>
          <Columns items={data.products}></Columns>
        </MainContent>

        {/* footer */}
      </div>
    </SelectedTagsContext.Provider>
  );
};

export default Home;
