import timeRole from "../fragments/timeRoleFrags";
import gql from "graphql-tag";
import user from "../fragments/userFrags";

const CREATE_TIMEROLE = gql`
  mutation CREATE_TIMEROLE(
    $name: String!
    $shortName: String!
    $description: String!
    $payRate: Int!
  ) {
    createTimeRole(
      data: {
        name: $name
        shortName: $shortName
        description: $description
        payRate: $payRate
      }
    ) {
      ...allTimeRoleFields
    }
  }
  ${timeRole.fragments.allTimeRoleFields}
`;

const UPDATE_TIMEROLE = gql`
  mutation Update_TimeRole(
    $id: String!
    $name: String!
    $shortName: String!
    $description: String!
    $payRate: Int!
  ) {
    updateTimeRole(
      data: {
        name: $name
        shortName: $shortName
        description: $description
        payRate: $payRate
      }
      where: { id: $id }
    ) {
      ...allTimeRoleFields
    }
  }
  ${timeRole.fragments.allTimeRoleFields}
`;

const UPDATE_TIMEROLE_USERS = gql`
  mutation Update_TimeRoles_Users(
    $id: String!
    $userID: [UserWhereUniqueInput!]
  ) {
    updateTimeRole(data: { users: { set: $userID } }, where: { id: $id }) {
      ...allTimeRoleFields
      users {
        ...allUserFields
      }
    }
  }
  ${user.fragments.allUserFields}

  ${timeRole.fragments.allTimeRoleFields}
`;

const DELETE_TIMEROLE = gql`
  mutation Delete_TimeRole($id: ID!) {
    deleteTimeRole(id: $id) {
      ...allTimeRoleFields
    }
  }
  ${timeRole.fragments.allTimeRoleFields}
`;

export {
  CREATE_TIMEROLE,
  UPDATE_TIMEROLE,
  DELETE_TIMEROLE,
  UPDATE_TIMEROLE_USERS
};
