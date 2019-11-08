import gql from "graphql-tag";

const punchCardFrags: { fragments: any } = { fragments: {} };

punchCardFrags.fragments = {
  allPunchCardFields: gql`
    fragment allPunchCardFields on PunchCard {
      id
      punchIn
      punchOut
      updatedAt
      createdAt
    }
  `
};

export default punchCardFrags;
