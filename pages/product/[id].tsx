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
  }, []);

  const images = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
      caption: "San Francisco",
    },
    {
      image:
        "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
      caption: "Scotland",
    },
    {
      image:
        "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
      caption: "Darjeeling",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
      caption: "San Francisco",
    },
    {
      image:
        "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
      caption: "Scotland",
    },
    {
      image:
        "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
      caption: "Darjeeling",
    },
    {
      image:
        "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
      caption: "San Francisco",
    },
    {
      image:
        "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
      caption: "Scotland",
    },
    {
      image:
        "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
      caption: "Darjeeling",
    },
  ];
  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <div className="flex flex-col items-center h-screen ">
      <Navbar></Navbar>
      <BottomMenu scrollDirection={0}></BottomMenu>
      <Content>
        <ProductInformation>
          <Left>
            <Swiper
              style={
                {
                  // "--swiper-navigation-color": "#dedede",
                }
              }
              loop={true}
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
              {/* <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
              </SwiperSlide> */}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {data.product.pictures.map((item: any) => (
                <SwiperSlide>
                  <img src={item.url} />
                </SwiperSlide>
              ))}

              {/* <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
            </SwiperSlide> */}
            </Swiper>
          </Left>

          <Right>
            <h1>{data.product.title}</h1>
            <p>{data.product.description}</p>
            <p>{data.product.price}</p>
            <p>{data.product.stock}</p>
          </Right>
        </ProductInformation>
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
