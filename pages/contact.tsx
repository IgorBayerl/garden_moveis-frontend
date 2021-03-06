import { createElement, useEffect, useRef, useState } from "react";
import BottomMenu from "../components/BottomMenu";
import Content from "../components/Content";
import Navbar from "../components/NavBar";
import { FiInstagram, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import * as RIconFA from "react-icons/fa";
import Link from "next/link";
import Map, { Marker } from "react-map-gl";
import Footer from "../components/Footer";
import { gql, GraphQLClient } from "graphql-request";
import emailjs from "@emailjs/browser";

const FontAwesome: any = {
  FaPhone: RIconFA.FaPhone,
  FaInstagram: RIconFA.FaInstagram,
  FaMapMarkedAlt: RIconFA.FaMapMarkedAlt,
  FaEnvelope: RIconFA.FaEnvelope,
  FaWhatsapp: RIconFA.FaWhatsapp,
};

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
        localization {
          latitude
          longitude
        }
        links {
          title
          url
          icon
        }
        pictures {
          url
        }
      }
    }
  `;
  const rawData = await graphQLClient.request(query);

  const generals = rawData.generals[0];
  const data = {
    links: generals.links,
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
    links: {
      title: string;
      url: string;
      icon: string;
    }[];
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

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_m81qnjv",
        "template_j7c6c78",
        e.target,
        "WsF1nIx9jagALlwQZ"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      )
      .then(() => {
        e.target.reset();
      });
  };

  /* Teste contact git debug */
  return (
    <div className="flex flex-col items-center h-screen ">
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
          <form
            onSubmit={sendEmail}
            className="bg-white div1 flex justify-between flex-col p-5 rounded-md"
          >
            <div className="flex flex-col flex-grow">
              <div className="mb-4 ">
                <label className="block text-gray-700  text-sm font-bold mb-2 ">
                  Nome
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="from_name"
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
                  type="email"
                  name="reply_to"
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
                  name="message"
                  placeholder="Mensagem"
                />
              </div>
            </div>
            <input
              type="submit"
              className="cursor-pointer shadow bg-verde-1 transition02 hover:bg-verde-2 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              value="Enviar Mensagem"
            />
            {/* <button
              type="submit"
              className="shadow bg-verde-1 transition02 hover:bg-verde-2 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Enviar Mensagem
            </button> */}
          </form>
          <div className="bg-verde-2 div2 p-5  rounded-md">
            {data.links.map((link) => (
              <Link href={link.url}>
                <a className="text-xl transition02 hover:bg-cinza-clarin rounded-full lg:text-2xl  my-2 text-icon-align">
                  <div className="bg-verde-1  contact-icon sm:p-5 p-4 rounded-full">
                    {FontAwesome[link.icon] != undefined ? (
                      createElement(FontAwesome[link.icon], {
                        key: link.icon,
                        block: link.icon,
                      })
                    ) : (
                      <RIconFA.FaPlusCircle />
                    )}
                  </div>

                  {link.title}
                </a>
              </Link>
            ))}
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
