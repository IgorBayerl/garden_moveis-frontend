import { gql, GraphQLClient } from "graphql-request";
import BottomMenu from "../../components/BottomMenu";
import Navbar from "../../components/NavBar";
import { IProduct } from "../../interfaces/data";
// import { getStaticProps } from "./../index";

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
    <div className="flex flex-col items-center h-screen overflow-hidden ">
      <Navbar></Navbar>
      <BottomMenu scrollDirection={0}></BottomMenu>
      <h1>Product page</h1>
      <p>{data.product.title}</p>
      <p>{data.product.description}</p>
      <p>{data.product.price}</p>
      <p>{data.product.stock}</p>
      <p>{JSON.stringify(data.product.categories)}</p>
      <p>{JSON.stringify(data.product.relatedProducts)}</p>
    </div>
  );
};

export default Product;
