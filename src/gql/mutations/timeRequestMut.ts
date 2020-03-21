import gql from "graphql-tag";
// import timeRole from "../fragments/timeRoleFrags";
import timeRequestFrags from "../fragments/timeRequestFrags";

const CREATE_TIMEREQUEST = gql`
  mutation CreateTimeRequest(
    $userId: String!
    $startTime: DateTime!
    $endTime: DateTime!
    $reason: String!
    $isAllDay: Boolean!
    $approved: Boolean
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
    $id: String!
    $userId: String!
    $startTime: DateTime!
    $endTime: DateTime!
    $reason: String!
    $isAllDay: Boolean!
    $approved: Boolean
  ) {
    updateTimeRequest(
      data: {
        startTime: $startTime
        endTime: $endTime
        reason: $reason
        isAllDay: $isAllDay
        approved: $approved
        user: { connect: { id: $userId } }
      }
      where: { id: $id }
    ) {
      ...allTimeRequestFields
    }
  }
  ${timeRequestFrags.fragments.allTimeRequestFields}
`;

const DELETE_TIMEREQUEST = gql`
  mutation DeleteTimeRequest($id: String!) {
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
