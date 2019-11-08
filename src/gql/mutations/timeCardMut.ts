import gql from "graphql-tag";
import timeCard from "../fragments/timeCardFrags";
import timeRole from "../fragments/timeRoleFrags";

const PUNCH_TIME = gql`
  mutation punchtime(
    $id: ID!
    $timeid: ID!
    $punchTime: DateTime!
    $punchType: Punchtype!
  ) {
    createTimeCard(
      data: {
        punchTime: $punchTime
        punchType: $punchType
        user: { connect: { id: $id } }
        timeRole: { connect: { id: $timeid } }
      }
    ) {
      ...allTimeCardFields
    }
  }
  ${timeCard.fragments.allTimeCardFields}
`;

const UPDATE_TIMECARD = gql`
  mutation Update_TimeCard(
    $tid: ID!
    $id: ID!
    $timeid: ID!
    $punchTime: DateTime!
    $punchType: Punchtype!
  ) {
    updateTimeCard(
      data: {
        punchTime: $punchTime
        punchType: $punchType
        user: { connect: { id: $id } }
        timeRole: { connect: { id: $timeid } }
      }
      where: { id: $tid }
    ) {
      ...allTimeCardFields
    }
  }
  ${timeCard.fragments.allTimeCardFields}
`;

const DELETE_TIMECARD = gql`
  mutation Delete_TimeCard($id: ID!) {
    deleteTimeCard(where: { id: $id }) {
      ...allTimeCardFields
    }
  }
  ${timeCard.fragments.allTimeCardFields}
`;

const TIMECLOCKS_FOR_USER = gql`
  query timeclocksforuser($id: String!, $date: DateTime!) {
    timeCards(
      where: { user: { id: { equals: $id } }, punchTime: { gt: $date } }
      orderBy: { punchTime: desc }
    ) {
      ...allTimeCardFields
      timeRole {
        ...allTimeRoleFields
      }
    }
  }
  ${timeCard.fragments.allTimeCardFields}
  ${timeRole.fragments.allTimeRoleFields}
`;

export { PUNCH_TIME, TIMECLOCKS_FOR_USER, DELETE_TIMECARD, UPDATE_TIMECARD };
