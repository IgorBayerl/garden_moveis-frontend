import { useEffect, useState } from "react";
import BottomMenu from "../components/BottomMenu";
import Content from "../components/Content";
import Navbar from "../components/NavBar";
import { FiInstagram, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import * as RIconIM from "react-icons/im";
import Link from "next/link";
import Map, { Marker } from "react-map-gl";
import Footer from "../components/Footer";
import { gql, GraphQLClient } from "graphql-request";

export const getStaticProps = async () => {
  const url = `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_API_KEY}`,
    },
  });
  const query = gql`
    {
      generals {
        phoneNumber
        whatsapp
        email
        address
        instagram
        pictures {
          url
        }
        localization {
          latitude
          longitude
        }
      }
    }
  `;
  const rawData = await graphQLClient.request(query);

  const generals = rawData.generals[0];
  const data = {
    phoneNumber: generals.phoneNumber,
    whatsapp: generals.whatsapp,
    email: generals.email,
    address: generals.address,
    instagram: generals.instagram,
    pictures: generals.pictures,
    localization: generals.localization,
  };
  return {
    props: { data },
    revalidate: 60,
  };
};

interface IProps {
  data: {
    phoneNumber: string[];
    whatsapp: string[];
    email: string;
    address: string;
    instagram: string;
    pictures: {
      url: string;
    }[];
    localization: {
      latitude: number;
      longitude: number;
    };
  };
}

const Contact: React.FC<IProps> = ({ data }) => {
  const [scrollDirection, setScrollDirection] = useState<number>(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    console.log(data);
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
        <div className="md:parent ">
          <form className="bg-white div1 flex justify-between flex-col p-5 rounded-md">
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
          <div className="bg-verde-2 div2 p-5 rounded-md">
            <Link
              href={`https://maps.google.com/?ll=${data.localization.latitude},${data.localization.longitude}`}
            >
              <a className="text-xl transition02 hover:bg-cinza-clarin rounded-full lg:text-2xl   text-icon-align">
                <div className="bg-verde-1  contact-icon sm:p-5 p-4 rounded-full">
                  <FiMapPin />
                </div>
                rua carlos manoel linzmeyer 1500
              </a>
            </Link>
            <Link href={`mailto:${data.email} `}>
              <a className="text-xl transition02 hover:bg-cinza-clarin rounded-full lg:text-2xl  my-5 text-icon-align">
                <div className="bg-verde-1  contact-icon sm:p-5 p-4 rounded-full">
                  <FiMail />
                </div>
                {data.email}
              </a>
            </Link>
            <Link href={`https://www.instagram.com/${data.instagram}/`}>
              <a className="text-xl transition02 hover:bg-cinza-clarin rounded-full lg:text-2xl   text-icon-align">
                <div className="bg-verde-1  contact-icon sm:p-5 p-4 rounded-full">
                  <FiInstagram />
                </div>{" "}
                {data.instagram}
              </a>
            </Link>
            <Link href={`https://wa.me/${data.whatsapp[0]}`}>
              <a className="text-xl transition02 hover:bg-cinza-clarin rounded-full lg:text-2xl  mt-5 text-icon-align">
                <div className="bg-verde-1  contact-icon sm:p-5 p-4 rounded-full">
                  <RIconIM.ImWhatsapp />
                </div>
                {data.whatsapp[0]}
              </a>
            </Link>
            {data.phoneNumber.length > 0
              ? data.phoneNumber.map((phone, index) => (
                  <Link href={`tel:${phone}`} key={index}>
                    <a className="text-xl transition02 hover:bg-cinza-clarin rounded-full lg:text-2xl  mt-5 text-icon-align">
                      <div className="bg-verde-1  contact-icon sm:p-5 p-4 rounded-full">
                        <FiPhone />
                      </div>
                      {phone}
                    </a>
                  </Link>
                ))
              : null}
          </div>
          <div className="bg-red-500 div3  rounded-md">
            <Map
              initialViewState={{
                latitude: data.localization.latitude,
                longitude: data.localization.longitude,
                zoom: 13,
              }}
              mapboxAccessToken={
                "pk.eyJ1IjoiaWdvcmJheWVybCIsImEiOiJjbDAzM2h0d3owMTg2M2lxd2s2ODE2OGd0In0.6Irwj_LC4yNWwckKW3mGpg"
              }
              style={{ width: "100%", height: 300, background: "white" }}
              mapStyle="mapbox://styles/mapbox/light-v10"
            >
              <Marker
                latitude={data.localization.latitude}
                longitude={data.localization.longitude}
                anchor="bottom"
              >
                <img className="logoMapPin" src="./logoPin.svg" />
              </Marker>
            </Map>
          </div>
        </div>
      </Content>
      {/* <Footer /> */}

      <div className="background-one-collors md:background-two-collors">
        <div className="bg-[#dbf1d8] bg-p-1"></div>
        <div className="bg-[#dbf1d8] bg-p-2"></div>
      </div>
    </div>
  );
};

export default Contact;
