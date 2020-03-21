import gql from "graphql-tag";
import { taskFrags } from "../fragments/taskFrags";

const GET_TASKGROUPS = gql`
  query getTaskGroups {
    taskGroups {
      ...allTaskGroupFields
      tasks {
        ...allTaskFields
        childrenTasks {
          ...allTaskFields
          childrenTasks {
            ...allTaskFields
          }
        }
      }
    }
  }

  ${taskFrags.fragments.allTaskFields}
  ${taskFrags.fragments.allTaskGroupFields}
`;

export { GET_TASKGROUPS };
