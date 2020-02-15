import gql from "graphql-tag";
// import timeRole from "../fragments/timeRoleFrags";
import timeRequestFrags from "../fragments/timeRequestFrags";
import user from "../fragments/userFrags";

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

const GET_TIMEREQUEST_ID_DATES = gql`
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
      user {
        ...allUserFields
      }
    }
  }
  ${user.fragments.allUserFields}

  ${timeRequestFrags.fragments.allTimeRequestFields}
`;

const Q_GET_TIMEREQUEST = gql`
  query QGetTimeRequests($where: TimeRequestWhereInput!) {
    timeRequests(where: $where) {
      ...allTimeRequestFields
      user {
        ...allUserFields
      }
    }
  }
  ${user.fragments.allUserFields}
  ${timeRequestFrags.fragments.allTimeRequestFields}
`;

export { GET_TIMEREQUEST_ID_DATES, Q_GET_TIMEREQUEST };
