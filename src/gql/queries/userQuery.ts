import gql from "graphql-tag";
import user from "../fragments/userFrags";
import timeRole from "../fragments/timeRoleFrags";

const GET_ME = gql`
  query Me {
    me {
      ...allUserFields
      timeRoles {
        ...allTimeRoleFields
      }
      # timeCards(orderBy: { punchTime: desc }, first: 1) {
      #   ...allTimeCardFields
      #   timeRole {
      #     id
      #   }
      # }
    }
  }

  ${user.fragments.allUserFields}
  ${timeRole.fragments.allTimeRoleFields}
`;

const GET_USERS = gql`
  query Get_Users {
    users {
      ...allUserFields
      timeRoles {
        ...allTimeRoleFields
      }
    }
  }

  ${user.fragments.allUserFields}
  ${timeRole.fragments.allTimeRoleFields}
`;

const USERS_WHEREQ = gql`
  query UsersWhereQ($query: UserWhereInput!) {
    users(where: $query) {
      ...allUserFields
      timeRoles {
        ...allTimeRoleFields
      }
    }
  }

  ${user.fragments.allUserFields}
  ${timeRole.fragments.allTimeRoleFields}
`;

const NEW_GET_ME = gql`
  query NewGetMe {
    me {
      ...allUserFields
      timeRoles {
        ...allTimeRoleFields
      }
    }
  }

  ${user.fragments.allUserFields}
  ${timeRole.fragments.allTimeRoleFields}
`;

export { GET_ME, GET_USERS, NEW_GET_ME, USERS_WHEREQ };
