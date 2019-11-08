import React from "react";

import { Query } from "react-apollo";
import { GET_ME } from "../gql/queries/userQuery";
import PropTypes from "prop-types";

//Todo Fix Any

interface IProps {
  fresh?: PropTypes.Requireable<string>;
  children: any;
}

const Me: React.FC<IProps> = ({ children, fresh = undefined }) => {
  return (
    <Query query={GET_ME} fetchPolicy={fresh ? "network-only" : undefined}>
      {({ data = {}, loading = {} }: any) => {
        if (loading) data.loading = loading;
        return children(data);
      }}
    </Query>
  );
};

export default Me;
