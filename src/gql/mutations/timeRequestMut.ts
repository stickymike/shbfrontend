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
export { CREATE_TIMEREQUEST };
