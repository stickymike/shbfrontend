import gql from "graphql-tag";
// import timeRole from "../fragments/timeRoleFrags";
import timeRequestFrags from "../fragments/timeRequestFrags";

const CREATE_TIMEREQUEST = gql`
  mutation CreateTimeRequest(
    $userId: ID!
    $startTime: DateTime!
    $endTime: DateTime!
    $reason: String!
    $isAllDay: Boolean!
    $approved: Boolean!
  ) {
    createTimeRequest(
      data: {
        startTime: $startTime
        endTime: $endTime
        reason: $reason
        isAllDay: $isAllDay
        approved: $approved
        user: { connect: { id: $userId } }
      }
    ) {
      ...allTimeRequestFields
    }
  }
  ${timeRequestFrags.fragments.allTimeRequestFields}
`;

const PERSONAL_UPDATE_TIMEREQUEST = gql`
  mutation PersonalUpdateTimeRequest(
    $id: ID!
    $startTime: DateTime!
    $endTime: DateTime!
    $reason: String!
    $isAllDay: Boolean!
    $approved: Boolean!
    $updatedAt: DateTime!
    $userUpdatedAt: DateTime!
  ) {
    updateTimeRequest(
      data: {
        startTime: $startTime
        endTime: $endTime
        reason: $reason
        isAllDay: $isAllDay
        approved: $approved
        updatedAt: $updatedAt
        userUpdatedAt: $userUpdatedAt
      }
      where: { id: $id }
    ) {
      ...allTimeRequestFields
    }
  }
  ${timeRequestFrags.fragments.allTimeRequestFields}
`;

const DELETE_TIMEREQUEST = gql`
  mutation DeleteTimeRequest($id: ID!) {
    deleteTimeRequest(where: { id: $id }) {
      id
      ...allTimeRequestFields
    }
  }
  ${timeRequestFrags.fragments.allTimeRequestFields}
`;

// id
// duration
// startTime
// endTime
// name
// approved
// description
// isAllDay
// updatedAt
// createdAt
export { CREATE_TIMEREQUEST, DELETE_TIMEREQUEST, PERSONAL_UPDATE_TIMEREQUEST };
