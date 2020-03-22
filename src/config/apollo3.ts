import { endpoint, prodEndpoint } from "./config";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink
} from "@apollo/client";
import { onError } from "@apollo/link-error";

// import { ApolloClient } from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";
// import { onError } from "apollo-link-error";
// import { ApolloLink } from "apollo-link";

const cache = new InMemoryCache();

// const cache = new InMemoryCache({
//   cacheRedirects: {
//     Query: {
//       timeCard: (_, args, { getCacheKey }) => {
//         return getCacheKey({ __typename: "TimeCard", id: args.where.id });
//       }
//     }
//   }
// });

// const GET_CART_ITEMS = gql`
//   query GetCartItems {
//     cartItems @client
//   }
// `;

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
      credentials: "include"
    })
  ]),
  cache,
  connectToDevTools: true
});

export default client;
