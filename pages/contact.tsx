import { useEffect, useState } from "react";
import BottomMenu from "../components/BottomMenu";
import Content from "../components/Content";
import Navbar from "../components/NavBar";
import Right from "../components/Right";
import { ICategory } from "../interfaces/data";
import Left from "./../components/Left";
import { BsInstagram, BsMailbox } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { FiInstagram, FiMail, FiMapPin } from "react-icons/fi";
import { ImWhatsapp } from "react-icons/im";
import Link from "next/link";

// import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Contact() {
  const [scrollDirection, setScrollDirection] = useState<number>(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
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

  // const Map = ReactMapboxGl({
  //   accessToken:
  //     "pk.eyJ1IjoiZmFicmljOCIsImEiOiJjaWc5aTV1ZzUwMDJwdzJrb2w0dXRmc2d0In0.p6GGlfyV-WksaDV_KdN27A",
  // });
  return (
    <div className="flex flex-col items-center ">
      <Navbar></Navbar>
      <BottomMenu
        currentPage="contact"
        scrollDirection={scrollDirection}
      ></BottomMenu>
      <Content>
        <div className=" my-10">
          <h1 className="text-center text-3xl sm:text-5xl">
            Entre em contato!
          </h1>
        </div>
        <div className="sm:flex max-h-fit my-10 gap-3">
          <form className="bg-white shadow-md w-full sm:w-1/2 rounded px-8 pt-6 pb-8 mb-4 sm:mb-0">
            <div className="mb-4 ">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nome
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Nome"
              />
            </div>
            <div className="mb-4 ">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="mb-4 ">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mensagem
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full mintextarea-h py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                placeholder="Mensagem"
              />
            </div>
            <div>
              <button
                type="submit"
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Enviar Mensagem
              </button>
            </div>
          </form>
          <div className=" w-full h-full sm:w-1/2">
            <div className="bg-red-400 p-4 mb-3 w-full">
              <h1>Redes sociais</h1>
              <Link href={""}>
                <a className="sm:text-2xl text-xl  text-icon-align">
                  <div className="bg-blue-400 sm:p-5 p-4 rounded-full">
                    <FiMapPin />
                  </div>
                  rua carlos manoel linzmeyer 1500
                </a>
              </Link>
              <Link href={""}>
                <a className="sm:text-2xl text-xl my-5 text-icon-align">
                  <div className="bg-blue-400 sm:p-5 p-4 rounded-full">
                    <FiMail />
                  </div>
                  gardenmoveis01@gmail.com
                </a>
              </Link>
              <Link href={""}>
                <a className="sm:text-2xl text-xl  text-icon-align">
                  <div className="bg-blue-400 sm:p-5 p-4 rounded-full">
                    <FiInstagram />
                  </div>{" "}
                  @garden_moveissbs
                </a>
              </Link>
              <Link href={"https://wa.me/5547984424549"}>
                <a className="sm:text-2xl text-xl mt-5 text-icon-align">
                  <div className="bg-blue-400 sm:p-5 p-4 rounded-full">
                    <ImWhatsapp />
                  </div>
                  (47) 9 8442-4549)
                </a>
              </Link>
            </div>
            <div className="bg-red-500 w-full py-20">
              {/* <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                  height: "100vh",
                  width: "100vw",
                }}
              >
                <Layer
                  type="symbol"
                  id="marker"
                  layout={{ "icon-image": "marker-15" }}
                >
                  <Feature
                    coordinates={[-0.481747846041145, 51.3233379650232]}
                  />
                </Layer>
              </Map> */}
            </div>
          </div>
        </div>
      </Content>
      <div className="background-one-collors sm:background-two-collors">
        <div className="bg-red-300 bg-p-1">A</div>
        <div className="bg-blue-300 bg-p-2">B</div>
      </div>
    </div>
  );
}
