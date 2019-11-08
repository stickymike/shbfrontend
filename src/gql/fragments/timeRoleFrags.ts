import gql from "graphql-tag";

const timeRolefrags: { fragments: any } = { fragments: {} };

timeRolefrags.fragments = {
  allTimeRoleFields: gql`
    fragment allTimeRoleFields on TimeRole {
      id
      name
      shortName
      description
      payRate
      updatedAt
      createdAt
    }
  `
};

export default timeRolefrags;
