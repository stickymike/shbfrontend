import gql from "graphql-tag";

const GET_PERMISSIONS = gql`
  query AllPermissions {
    __type(name: "Permissions") {
      enumValues {
        name
      }
    }
  }
`;

export { GET_PERMISSIONS };
