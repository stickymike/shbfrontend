import gql from "graphql-tag";
import user from "../fragments/userFrags";
import timeRole from "../fragments/timeRoleFrags";
import timeCard from "../fragments/timeCardFrags";

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;

const CODE_TO_USER = gql`
  mutation codetouser($code: Int!) {
    clockcodetouser(code: $code) {
      ...allUserFields
      timeRoles {
        ...allTimeRoleFields
      }
      timeCards(orderBy: { punchTime: desc }, first: 1) {
        ...allTimeCardFields
        timeRole {
          id
        }
      }
    }
  }

  ${user.fragments.allUserFields}
  ${timeRole.fragments.allTimeRoleFields}
  ${timeCard.fragments.allTimeCardFields}
`;

const DELETE_USER = gql`
  mutation Delete_User($id: ID!) {
    deleteUser(where: { id: $id }) {
      ...allUserFields
    }
  }
  ${user.fragments.allUserFields}
`;
const UPDATE_USER_PERMISSIONS = gql`
  mutation Update_User_Permissions($id: ID!, $permissions: [Permissions!]) {
    updateUser(
      data: { permissions: { set: $permissions } }
      where: { id: $id }
    ) {
      ...allUserFields
    }
  }
  ${user.fragments.allUserFields}
`;

const UPDATE_USER_TIMEROLES = gql`
  mutation Update_User_TimeRoles(
    $id: ID!
    $timeID: [TimeRoleWhereUniqueInput!]
  ) {
    updateUser(data: { timeRoles: { set: $timeID } }, where: { id: $id }) {
      ...allUserFields
    }
  }
  ${user.fragments.allUserFields}
`;

const CREATE_USER = gql`
  mutation Create_User(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $code: Int!
    $title: String
  ) {
    createUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      code: $code
      title: $title
    ) {
      ...allUserFields
    }
  }
  ${user.fragments.allUserFields}
`;

const RESET_PASSWORD = gql`
  mutation Reset_Password($id: ID!, $password: String!) {
    resetPassword(id: $id, password: $password) {
      ...allUserFields
    }
  }
  ${user.fragments.allUserFields}
`;

const UPDATE_USER = gql`
  mutation Update_User(
    $email: String!
    $lastName: String!
    $firstName: String!
    $code: Int!
    $id: ID!
    $title: String
  ) {
    updateUser(
      data: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        code: $code
        title: $title
      }
      where: { id: $id }
    ) {
      ...allUserFields
    }
  }
  ${user.fragments.allUserFields}
`;

export {
  SIGN_IN,
  CODE_TO_USER,
  UPDATE_USER_TIMEROLES,
  UPDATE_USER_PERMISSIONS,
  DELETE_USER,
  CREATE_USER,
  RESET_PASSWORD,
  UPDATE_USER
};
