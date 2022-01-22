import { gql } from "@apollo/client";

const GET_HOME_PAGE_DATA = gql`
  query {
    products {
      data {
        attributes {
          name
          description
          stock
          categories {
            data {
              attributes {
                name
              }
            }
          }
          price
          pictures {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export { GET_HOME_PAGE_DATA };
