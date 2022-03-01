import { useEffect, useState } from "react";
import BottomMenu from "../components/BottomMenu";
import Content from "../components/Content";
import Navbar from "../components/NavBar";
import { FiInstagram, FiMail, FiMapPin } from "react-icons/fi";
import { ImWhatsapp } from "react-icons/im";
import Link from "next/link";
import Map, { Marker } from "react-map-gl";
import Footer from "../components/Footer";

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

  return (
    <div className="flex flex-col items-center ">
      <Navbar></Navbar>
      <BottomMenu
        currentPage="contact"
        scrollDirection={scrollDirection}
      ></BottomMenu>
      <Content>
        <div className=" my-10">
          <h1 className="text-center text-3xl sm:text-5xl ">
            Entre em contato!
          </h1>
        </div>
        <div className="md:flex max-h-[80vh] my-10 gap-3">
          <form className="bg-white shadow-md w-full md:w-1/2 rounded px-8 pt-6 pb-8 mb-4 sm:mb-0 flex flex-col justify-between">
            <div className="flex flex-col flex-grow">
              <div className="mb-4 ">
                <label className="block text-gray-700  text-sm font-bold mb-2 ">
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
                <label className="block text-gray-700  text-sm font-bold mb-2 ">
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
                <label className="block text-gray-700  text-sm font-bold mb-2 ">
                  Mensagem
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full mintextarea-h py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  placeholder="Mensagem"
                />
              </div>
            </div>
            <button
              type="submit"
              className="shadow bg-verde-1 transition02 hover:bg-verde-2 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Enviar Mensagem
            </button>
          </form>
          <div className=" w-full h-full md:w-1/2">
            <div className="bg-verde-2 rounded-[5px] p-4 mb-3 w-full">
              <Link href={"https://maps.google.com/?ll=-26.27362,-49.34624"}>
                <a className="text-xl transition02 hover:bg-cinza-clarin rounded-full lg:text-2xl   text-icon-align">
                  <div className="bg-verde-1  contact-icon sm:p-5 p-4 rounded-full">
                    <FiMapPin />
                  </div>
                  rua carlos manoel linzmeyer 1500
                </a>
              </Link>
              <Link href={"mailto:gardenmoveis01@gmail.com "}>
                <a className="text-xl transition02 hover:bg-cinza-clarin rounded-full lg:text-2xl  my-5 text-icon-align">
                  <div className="bg-verde-1  contact-icon sm:p-5 p-4 rounded-full">
                    <FiMail />
                  </div>
                  gardenmoveis01@gmail.com
                </a>
              </Link>
              <Link href={"https://www.instagram.com/garden.moveissbs/"}>
                <a className="text-xl transition02 hover:bg-cinza-clarin rounded-full lg:text-2xl   text-icon-align">
                  <div className="bg-verde-1  contact-icon sm:p-5 p-4 rounded-full">
                    <FiInstagram />
                  </div>{" "}
                  @garden_moveissbs
                </a>
              </Link>
              <Link href={"https://wa.me/5547984424549"}>
                <a className="text-xl transition02 hover:bg-cinza-clarin rounded-full lg:text-2xl  mt-5 text-icon-align">
                  <div className="bg-verde-1  contact-icon sm:p-5 p-4 rounded-full">
                    <ImWhatsapp />
                  </div>
                  (47) 9 8442-4549)
                </a>
              </Link>
            </div>
            <div className="bg-red-500 w-full  ">
              <Map
                initialViewState={{
                  latitude: -26.27362,
                  longitude: -49.34624,
                  zoom: 13,
                }}
                mapboxAccessToken={
                  "pk.eyJ1IjoiaWdvcmJheWVybCIsImEiOiJjbDAzM2h0d3owMTg2M2lxd2s2ODE2OGd0In0.6Irwj_LC4yNWwckKW3mGpg"
                }
                style={{ width: "100%", height: 300, background: "white" }}
                mapStyle="mapbox://styles/mapbox/light-v10"
              >
                <Marker
                  latitude={-26.27362}
                  longitude={-49.34624}
                  anchor="bottom"
                >
                  <img className="logoMapPin" src="./logoPin.svg" />
                </Marker>
              </Map>
            </div>
          </div>
        </div>
      </Content>

      <Footer />
      <div className="background-one-collors md:background-two-collors">
        <div className="bg-[#dbf1d8] bg-p-1"></div>
        <div className="bg-[#dbf1d8] bg-p-2"></div>
      </div>
    </div>
  );
}
