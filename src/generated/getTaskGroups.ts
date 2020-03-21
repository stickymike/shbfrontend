/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getTaskGroups
// ====================================================

export interface getTaskGroups_taskGroups_tasks_childrenTasks_childrenTasks {
  __typename: "Task";
  id: string;
  name: string;
}

export interface getTaskGroups_taskGroups_tasks_childrenTasks {
  __typename: "Task";
  id: string;
  name: string;
  childrenTasks: getTaskGroups_taskGroups_tasks_childrenTasks_childrenTasks[];
}

export interface getTaskGroups_taskGroups_tasks {
  __typename: "Task";
  id: string;
  name: string;
  childrenTasks: getTaskGroups_taskGroups_tasks_childrenTasks[];
}

export interface getTaskGroups_taskGroups {
  __typename: "TaskGroup";
  id: string;
  name: string;
  tasks: getTaskGroups_taskGroups_tasks[];
}

export interface getTaskGroups {
  taskGroups: getTaskGroups_taskGroups[];
}
