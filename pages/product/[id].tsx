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

const Product: React.FC<IProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center h-screen ">
      <Navbar></Navbar>
      <BottomMenu scrollDirection={0}></BottomMenu>
      <Content>
        <ProductInformation>
          <Left>
            <img src={data.product.pictures[0].url} alt="" />
            {/* <ProductImages></ProductImages> */}
          </Left>
          <Right>
            <h1>{data.product.title}</h1>
            <p>{data.product.description}</p>
            <p>{data.product.price}</p>
            <p>{data.product.stock}</p>
            <div className=" pb-2">
              {data.product.categories.map((category: any) => (
                <Category>{category.title}</Category>
              ))}
            </div>
          </Right>
        </ProductInformation>
        <RelatedProducts>
          {data.product.relatedProducts?.map((item) => (
            <Card key={item.id} item={item}></Card>
          ))}
        </RelatedProducts>
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
