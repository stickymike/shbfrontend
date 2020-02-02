import gql from "graphql-tag";

const timeRequestFrags: { fragments: any } = { fragments: {} };

timeRequestFrags.fragments = {
  allTimeRequestFields: gql`
    fragment allTimeRequestFields on TimeRequest {
      id
      startTime
      endTime
      approved
      reason
      isAllDay
      updatedAt
      createdAt
      userUpdatedAt
    }
  `
};

export default timeRequestFrags;
