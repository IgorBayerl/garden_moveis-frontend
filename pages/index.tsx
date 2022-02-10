import Navbar from "../components/NavBar";
import BottomMenu from "../components/BottomMenu";
import Columns from "../components/Columns";
import MainContent from "../components/MainContent";

import { useCallback, useEffect, useState } from "react";
// import { GET_HOME_PAGE_DATA } from "../graphql/queries";
import Typography from "../components/Topography";
import { gql, GraphQLClient } from "graphql-request";
import { IProduct } from "../interfaces/data";

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
  console.log(JSON.stringify(data, undefined, 2));
  return {
    props: { data },
  };
};

const Home: React.FC<IProps> = ({ data }) => {
  // const [itemsData, setItemsData] = useState<IData>({ data: [] });

  return (
    <div className="flex flex-col items-center h-screen overflow-hidden ">
      {/* <Typography
        className="opacity-10 absolute -z-10 "
        height="500"
      ></Typography> */}
      <Navbar></Navbar>
      <BottomMenu></BottomMenu>
      <p>{JSON.stringify(data)}</p>
      <MainContent>
        <Columns items={data.products}></Columns>
      </MainContent>

      {/* TopBar/NavBar */}
      {/* tags list */}
      {/* Main content */}
      {/* tagsList */}
      {/* menu */}
    </div>
  );
};

export default Home;
