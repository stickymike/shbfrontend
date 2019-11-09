import gql from "graphql-tag";
import user from "../fragments/userFrags";
import timeRole from "../fragments/timeRoleFrags";
// import timeCard from "../fragments/timeCardFrags";

// const GET_ME = gql`
//   query {
//     me {
//       ...allUserFields
//       timeRoles {
//         ...allTimeRoleFields
//       }
//       timeCards(orderBy: punchTime_DESC, first: 1) {
//         ...allTimeCardFields
//         timeRole {
//           id
//         }
//       }
//     }
//   }

//   ${user.fragments.allUserFields}
//   ${timeRole.fragments.allTimeRoleFields}
//   ${timeCard.fragments.allTimeCardFields}
// `;

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

export { GET_ME, GET_USERS, NEW_GET_ME };
