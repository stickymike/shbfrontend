import gql from "graphql-tag";
import timeCard from "../fragments/timeCardFrags";
import user from "../fragments/userFrags";

import timeRole from "../fragments/timeRoleFrags";
import punchCard from "../fragments/punchCardFrags";

const PUNCHCARDS_USERID_DATE = gql`
  query punchcardsuseriddate($id: String!, $date: DateTime!) {
    punchCards(
      where: { user: { id: { equals: $id } }, punchIn: { gt: $date } }
      orderBy: { punchIn: desc }
    ) {
      ...allPunchCardFields

      timeRole {
        ...allTimeRoleFields
      }
    }
  }
  ${punchCard.fragments.allPunchCardFields}
  ${timeRole.fragments.allTimeRoleFields}
`;

const PUNCHCARDS_BY_ID = gql`
  query PunchCardById($id: ID!) {
    punchCard(where: { id: $id }) {
      ...allPunchCardFields
      user {
        ...allUserFields
      }
      timeRole {
        ...allTimeRoleFields
      }
    }
  }
  ${punchCard.fragments.allPunchCardFields}
  ${user.fragments.allUserFields}
  ${timeRole.fragments.allTimeRoleFields}
`;

const PUNCHCARDS_WHEREQ = gql`
  query PunchCardsWhereQ($query: QueryFindManyPunchCardWhereInput!) {
    punchCards(where: $query) {
      ...allPunchCardFields

      user {
        ...allUserFields
      }
      timeRole {
        ...allTimeRoleFields
      }
    }
  }
  ${punchCard.fragments.allPunchCardFields}
  ${user.fragments.allUserFields}
  ${timeRole.fragments.allTimeRoleFields}
`;

// const GET_TIMECARDS = gql`
//   query Get_TimeCards {
//     timeCards {
//       ...allTimeCardFields
//       user {
//         ...allUserFields
//       }
//       timeRole {
//         ...allTimeRoleFields
//       }
//     }
//   }
//   ${timeCard.fragments.allTimeCardFields}
//   ${user.fragments.allUserFields}
//   ${timeRole.fragments.allTimeRoleFields}
// `;

// const GET_TIMECARDS_ONEID = gql`
//   query Get_TimeCards_OneID($id: String!) {
//     timeCards(where: { id: { equals: $id } }) {
//       ...allTimeCardFields
//       user {
//         ...allUserFields
//       }
//       timeRole {
//         ...allTimeRoleFields
//       }
//     }
//   }
//   ${timeCard.fragments.allTimeCardFields}
//   ${user.fragments.allUserFields}
//   ${timeRole.fragments.allTimeRoleFields}
// `;

// const GET_TIMECARDS_WHEREQ = gql`
//   query Get_TimeCards_WhereQ($query: QueryFindManyTimeCardWhereInput!) {
//     timeCards(where: $query) {
//       ...allTimeCardFields
//       user {
//         ...allUserFields
//       }
//       timeRole {
//         ...allTimeRoleFields
//       }
//     }
//   }
//   ${timeCard.fragments.allTimeCardFields}
//   ${user.fragments.allUserFields}
//   ${timeRole.fragments.allTimeRoleFields}
// `;

// const GET_TIMECARD_BY_ID = gql`
//   query Get_TimeCards_ID($id: String!) {
//     timeCards(where: { id: { equals: $id } }) {
//       ...allTimeCardFields
//       user {
//         ...allUserFields
//       }
//       timeRole {
//         ...allTimeRoleFields
//       }
//     }
//   }
//   ${timeCard.fragments.allTimeCardFields}
//   ${user.fragments.allUserFields}
//   ${timeRole.fragments.allTimeRoleFields}
// `;

export { PUNCHCARDS_USERID_DATE, PUNCHCARDS_WHEREQ, PUNCHCARDS_BY_ID };
