import gql from "graphql-tag";
// import timeRole from "../fragments/timeRoleFrags";
import punchCard from "../fragments/punchCardFrags";

const NEW_PUNCHCARD = gql`
  mutation newpunchcard(
    $userId: ID!
    $timeRoleId: ID!
    $punchIn: DateTime!
    $punchOut: DateTime!
  ) {
    createPunchCard(
      data: {
        punchIn: $punchIn
        punchOut: $punchOut
        user: { connect: { id: $userId } }
        timeRole: { connect: { id: $timeRoleId } }
      }
    ) {
      ...allPunchCardFields
    }
  }
  ${punchCard.fragments.allPunchCardFields}
`;

const UPDATE_PUNCHCARD = gql`
  mutation UpdatePunchCard(
    $id: ID!
    $userId: ID!
    $timeRoleId: ID!
    $punchIn: DateTime!
    $punchOut: DateTime!
  ) {
    updatePunchCard(
      data: {
        punchIn: $punchIn
        punchOut: $punchOut
        user: { connect: { id: $userId } }
        timeRole: { connect: { id: $timeRoleId } }
      }
      where: { id: $id }
    ) {
      ...allPunchCardFields
    }
  }
  ${punchCard.fragments.allPunchCardFields}
`;

const DELETE_PUNCHCARD = gql`
  mutation DeletePunchCard($id: ID!) {
    deletePunchCard(where: { id: $id }) {
      ...allPunchCardFields
    }
  }
  ${punchCard.fragments.allPunchCardFields}
`;

const PUNCHOUT_PUNCHCARD = gql`
  mutation punchoutpunchcard($cardId: ID!, $punchOut: DateTime!) {
    updatePunchCard(where: { id: $cardId }, data: { punchOut: $punchOut }) {
      ...allPunchCardFields
    }
  }
  ${punchCard.fragments.allPunchCardFields}
`;

// const DELETE_TR = gql`
//   mutation DeleteTimeRequest($id: ID!) {
//     deleteTimeRequest(where: { id: $id }) {
//       id
//       # ...allTimeRequestFields
//     }
//   }
// `;

// const UPDATE_TIMECARD = gql`
//   mutation Update_TimeCard(
//     $tid: ID!
//     $id: ID!
//     $timeid: ID!
//     $punchTime: DateTime!
//     $punchType: Punchtype!
//   ) {
//     updateTimeCard(
//       data: {
//         punchTime: $punchTime
//         punchType: $punchType
//         user: { connect: { id: $id } }
//         timeRole: { connect: { id: $timeid } }
//       }
//       where: { id: $tid }
//     ) {
//       ...allTimeCardFields
//     }
//   }
//   ${timeCard.fragments.allTimeCardFields}
// `;

// const DELETE_TIMECARD = gql`
//   mutation Delete_TimeCard($id: ID!) {
//     deleteTimeCard(where: { id: $id }) {
//       ...allTimeCardFields
//     }
//   }
//   ${timeCard.fragments.allTimeCardFields}
// `;

// const TIMECLOCKS_FOR_USER = gql`
//   query timeclocksforuser($id: String!, $date: DateTime!) {
//     timeCards(
//       where: { user: { id: { equals: $id } }, punchTime: { gt: $date } }
//       orderBy: { punchTime: desc }
//     ) {
//       ...allTimeCardFields
//       timeRole {
//         ...allTimeRoleFields
//       }
//     }
//   }
//   ${timeCard.fragments.allTimeCardFields}
//   ${timeRole.fragments.allTimeRoleFields}
// `;

export {
  NEW_PUNCHCARD,
  PUNCHOUT_PUNCHCARD,
  UPDATE_PUNCHCARD,
  DELETE_PUNCHCARD
};
