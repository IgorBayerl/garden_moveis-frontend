import { gql, GraphQLClient } from "graphql-request";
import BottomMenu from "../../components/BottomMenu";
import Navbar from "../../components/NavBar";
import { IProduct } from "../../interfaces/data";
// import { getStaticProps } from "./../index";
import Category from "./../../components/Category";
import Card from "./../../components/Card";
import Content from "../../components/Content";
import ProductInformation from "../../components/ProductInformation";
import Left from "../../components/Left";
import Right from "../../components/Right";
import RelatedProducts from "../../components/RelatedProducts";
import ImageGallery from "react-image-gallery";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import NoActionCategory from "../../components/NoActionCategory";
import ProductsLine from "../../components/ProductsLine";
import HCard from "../../components/HCard";
import Footer from "../../components/Footer";

export const getStaticPaths = async () => {
  const url = `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_API_KEY}`,
    },
  });
  const query = gql`
    {
      products {
        id
      }
    }
  `;
  const data = await graphQLClient.request(query);

  const paths = data.products.map((item: any) => ({
    params: { id: item.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const url = `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_API_KEY}`,
    },
  });
  const query = gql`
    {
      product(where: { id: ${JSON.stringify(id)} }) {
        title
        description
        price
        stock
        pictures {
          id
          url
        }
        categories {
          title
        }
        colection {
          products (where: { id_not : ${JSON.stringify(id)} }) {
            id
            title
            pictures {
          url
        }
            categories {
              id
              title
            }
          }
        }
        relatedProducts {
          title
          categories {
            title
          }
          pictures {
            url
          }
        }
      }
    }
  `;
  const data = await graphQLClient.request(query);

  return {
    props: { data },
  };
};

interface IProps {
  data: IData;
}

interface IData {
  product: IProduct;
}

interface IImage {
  id: number;
  original: string;
  thumbnail: string;
  originalClass: string;
}

const Product: React.FC<IProps> = ({ data }) => {
  const [imagesArray, setImagesArray] = useState<IImage[]>([]);

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const [scrollDirection, setScrollDirection] = useState<number>(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [offset, setOffset] = useState(0);

  const arrayImagens = () => {
    let tempArray: IImage[] = [];
    data.product.pictures.forEach((item: any) => {
      tempArray.push({
        id: item.id,
        original: item.url,
        thumbnail: item.url,
        originalClass: "original-image-class",
      });
    });
    setImagesArray(tempArray);
  };

  useEffect(() => {
    arrayImagens();
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
    <div className="flex flex-col items-center h-screen ">
      <Navbar></Navbar>
      <BottomMenu
        currentPage="product"
        scrollDirection={scrollDirection}
      ></BottomMenu>
      <Content>
        <ProductInformation>
          <Left>
            <Swiper
              // style={{
              //   "--swiper-navigation-color": "#dedede",
              // }}
              loop={false}
              spaceBetween={0}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {data.product.pictures.map((item: any) => (
                <SwiperSlide key={item.id}>
                  <img src={item.url} alt="slide" />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={false}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {data.product.pictures.map((item: any) => (
                <SwiperSlide key={item.url}>
                  <img src={item.url} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="spacer my-3" />
            <h1 className="ml-1 text-2xl py-2">Categorias do produto.</h1>
            <div className="mt-2 flex flex-row flex-wrap">
              {data.product.categories.map((item: any) => (
                <NoActionCategory key={item.title}>
                  {item.title}
                </NoActionCategory>
              ))}
            </div>
          </Left>

          <Right>
            <h1 className="text-3xl py-2">{data.product.title}</h1>
            <div className="spacer my-3" />
            <p className="text-base bordinha-cinza-bottom">
              {data.product.description}
            </p>
            <div className="spacer my-6" />

            {data.product.price ? (
              <p className="text-base">
                Preço:
                <span className="ml-1 text-lg font-bold">
                  {data.product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </p>
            ) : (
              <></>
            )}

            {data.product.stock ? (
              <p className="text-base">
                Estoque:
                <span className="ml-1 text-lg font-bold">
                  {data.product.stock}
                </span>
              </p>
            ) : (
              <></>
            )}
          </Right>
        </ProductInformation>
        {data.product.colection ? (
          <ProductsLine title={"Coleção"}>
            {/* {JSON.stringify(data.product.colection)} */}
            {data.product.colection.products.map((item: any) => (
              <HCard key={item.id} item={item} />
            ))}
          </ProductsLine>
        ) : (
          <></>
        )}
        {data.product.colection ? (
          <ProductsLine title={"Categoria 1"}>
            {/* {JSON.stringify(data.product.colection)} */}
            {data.product.colection.products.map((item: any) => (
              <HCard key={item.id} item={item} />
            ))}
          </ProductsLine>
        ) : (
          <></>
        )}
        {data.product.colection ? (
          <ProductsLine title={"Categoria 2"}>
            {/* {JSON.stringify(data.product.colection)} */}
            {data.product.colection.products.map((item: any) => (
              <HCard key={item.id} item={item} />
            ))}
          </ProductsLine>
        ) : (
          <></>
        )}
      </Content>

      {/* <h1>Product page</h1>
      <p>{data.product.title}</p>
      <p>{data.product.description}</p>
      <p>{data.product.price}</p>
      <p>{data.product.stock}</p>

      <p>{JSON.stringify(data.product.pictures)}</p>
      <p>{JSON.stringify(data.product.categories)}</p>
      <p>{JSON.stringify(data.product.relatedProducts)}</p> */}
    </div>
  );
};

export default Product;
