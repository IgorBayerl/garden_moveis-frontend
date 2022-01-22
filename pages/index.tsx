import Head from "next/head";
import Navbar from "../components/NavBar";
import BottomMenu from "../components/BottomMenu";
import Columns from "../components/Columns";
import MainContent from "../components/MainContent";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen py-2 overflow-hidden bg-slate-200">
      <Navbar></Navbar>
      <BottomMenu></BottomMenu>
      <MainContent>
        <Columns></Columns>
        <Columns></Columns>
      </MainContent>

      {/* TopBar/NavBar */}
      {/* tags list */}
      {/* Main content */}
      {/* tagsList */}
      {/* menu */}
    </div>
  );
}
