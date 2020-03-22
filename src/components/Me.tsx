import React from "react";

import { GET_ME } from "../gql/queries/userQuery";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";

//Todo Fix Any

interface IProps {
  fresh?: PropTypes.Requireable<string>;
  children: any;
}

const Me: React.FC<IProps> = ({ children, fresh = undefined }) => {
  const { data, loading } = useQuery(GET_ME, {
    fetchPolicy: fresh ? "network-only" : undefined
  });
  let newData = data;
  if (loading) newData = { loading };

  return children(newData);

  //  <Query query={GET_ME} fetchPolicy={fresh ? "network-only" : undefined}>
  //     {({ data = {}, loading = {} }: any) => {
  //       console.log(data);
  //       if (loading) data.loading = loading;
  //       return children(data);
  //     }}
  //   </Query>
};

export default Me;
