import gql from "graphql-tag";
// import timeRole from "../fragments/timeRoleFrags";
import timeRequestFrags from "../fragments/timeRequestFrags";

const CREATE_TIMEREQUEST_ID_DATES = gql`
  query GetTimeRequestsIDandDates(
    $userId: String!
    $startTimeShown: DateTime!
    $endTimeShown: DateTime!
  ) {
    timeRequests(
      where: {
        startTime: { gte: $startTimeShown }
        endTime: { lte: $endTimeShown }
        user: { id: { equals: $userId } }
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
export { CREATE_TIMEREQUEST_ID_DATES };
