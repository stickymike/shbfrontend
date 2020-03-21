import gql from "graphql-tag";

const taskFrags: { fragments: any } = { fragments: {} };

taskFrags.fragments = {
  allTaskFields: gql`
    fragment allTaskFields on Task {
      id
      name
    }
  `,
  allTaskGroupFields: gql`
    fragment allTaskGroupFields on TaskGroup {
      id
      name
    }
  `
};

export { taskFrags };
