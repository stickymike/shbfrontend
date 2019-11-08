import gql from "graphql-tag";
import user from "../fragments/userFrags";
import timeRole from "../fragments/timeRoleFrags";
import timeCard from "../fragments/timeCardFrags";

const GET_TIMECARDS = gql`
  query Get_TimeCards {
    timeCards {
      ...allTimeCardFields
      user {
        ...allUserFields
      }
      timeRole {
        ...allTimeRoleFields
      }
    }
  }
  ${timeCard.fragments.allTimeCardFields}
  ${user.fragments.allUserFields}
  ${timeRole.fragments.allTimeRoleFields}
`;

const GET_TIMECARDS_ONEID = gql`
  query Get_TimeCards_OneID($id: String!) {
    timeCards(where: { id: { equals: $id } }) {
      ...allTimeCardFields
      user {
        ...allUserFields
      }
      timeRole {
        ...allTimeRoleFields
      }
    }
  }
  ${timeCard.fragments.allTimeCardFields}
  ${user.fragments.allUserFields}
  ${timeRole.fragments.allTimeRoleFields}
`;

const GET_TIMECARDS_WHEREQ = gql`
  query Get_TimeCards_WhereQ($query: QueryFindManyTimeCardWhereInput!) {
    timeCards(where: $query) {
      ...allTimeCardFields
      user {
        ...allUserFields
      }
      timeRole {
        ...allTimeRoleFields
      }
    }
  }
  ${timeCard.fragments.allTimeCardFields}
  ${user.fragments.allUserFields}
  ${timeRole.fragments.allTimeRoleFields}
`;

const GET_TIMECARD_BY_ID = gql`
  query Get_TimeCards_ID($id: String!) {
    timeCards(where: { id: { equals: $id } }) {
      ...allTimeCardFields
      user {
        ...allUserFields
      }
      timeRole {
        ...allTimeRoleFields
      }
    }
  }
  ${timeCard.fragments.allTimeCardFields}
  ${user.fragments.allUserFields}
  ${timeRole.fragments.allTimeRoleFields}
`;

export {
  GET_TIMECARDS,
  GET_TIMECARDS_ONEID,
  GET_TIMECARDS_WHEREQ,
  GET_TIMECARD_BY_ID
};
