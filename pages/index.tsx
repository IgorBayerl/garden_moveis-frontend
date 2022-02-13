import Navbar from "../components/NavBar";
import BottomMenu from "../components/BottomMenu";
import Columns from "../components/Columns";
import MainContent from "../components/MainContent";

import { useCallback, useEffect, useState } from "react";
// import { GET_HOME_PAGE_DATA } from "../graphql/queries";
import Typography from "../components/Topography";
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
  // const [itemsData, setItemsData] = useState<IData>({ data: [] });
  const [scrollDirection, setScrollDirection] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  return (
    <SelectedTagsContext.Provider value={{ selectedTags, setSelectedTags }}>
      <div className="flex flex-col items-center h-screen overflow-hidden ">
        <Navbar></Navbar>
        <BottomMenu scrollDirection={scrollDirection}></BottomMenu>
        <TagsList scrollDirection={scrollDirection}></TagsList>
        <MainContent setScrollDirection={setScrollDirection}>
          <Columns items={data.products}></Columns>
        </MainContent>

        {/* TopBar/NavBar */}
        {/* tags list */}
        {/* Main content */}
        {/* tagsList */}
        {/* menu */}
      </div>
    </SelectedTagsContext.Provider>
  );
};

export default Home;
