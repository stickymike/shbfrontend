import { gql } from "@apollo/client";

const userfrags: { fragments: any } = { fragments: {} };

userfrags.fragments = {
  allUserFields: gql`
    fragment allUserFields on User {
      id
      firstName
      lastName
      title
      code
      email
      updatedAt
      createdAt
      permissions
      clockedIn
      recentTimeRoleId
    }
  `
};

export default userfrags;
