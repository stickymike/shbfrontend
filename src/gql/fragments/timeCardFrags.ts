import gql from "graphql-tag";

const timeCardfrags: { fragments: any } = { fragments: {} };

timeCardfrags.fragments = {
  allTimeCardFields: gql`
    fragment allTimeCardFields on TimeCard {
      id
      punchTime
      punchType
      updatedAt
      createdAt
    }
  `
};

export default timeCardfrags;
