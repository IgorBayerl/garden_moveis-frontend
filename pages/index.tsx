import Head from "next/head";
import Navbar from "../components/NavBar";
import BottomMenu from "../components/BottomMenu";
import Columns from "../components/Columns";
import MainContent from "../components/MainContent";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { GET_HOME_PAGE_DATA } from "../graphql/queries";
import Typography from "../components/Topography";

export default function Home() {
  const [itemsData, setItemsData] = useState({});

  const client = new ApolloClient({
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
  });

  const fetchData = useCallback(async () => {
    console.log("aaaa? " + process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_API);
    try {
      const { data } = await client.query({ query: GET_HOME_PAGE_DATA });
      setItemsData(data?.products);
    } catch (error) {
      alert("Erro ao carregar os dados");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  console.log(itemsData);
  return (
    <div className="flex flex-col items-center h-screen overflow-hidden ">
      {/* <Typography
        className="opacity-10 absolute -z-10 "
        height="500"
      ></Typography> */}
      <Navbar></Navbar>
      <BottomMenu></BottomMenu>
      <MainContent>
        <Columns items={itemsData.data}></Columns>
      </MainContent>

      {/* TopBar/NavBar */}
      {/* tags list */}
      {/* Main content */}
      {/* tagsList */}
      {/* menu */}
    </div>
  );
}
