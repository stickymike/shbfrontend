import gql from "graphql-tag";
import user from "../fragments/userFrags";
import timeRole from "../fragments/timeRoleFrags";

const GET_TIMEROLES = gql`
  query Get_TimeRoles {
    timeRoles {
      ...allTimeRoleFields
      users {
        ...allUserFields
      }
    }
  }

  ${user.fragments.allUserFields}
  ${timeRole.fragments.allTimeRoleFields}
`;

export { GET_TIMEROLES };
