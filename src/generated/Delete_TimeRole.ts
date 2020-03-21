/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Delete_TimeRole
// ====================================================

export interface Delete_TimeRole_deleteTimeRole {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface Delete_TimeRole {
  deleteTimeRole: Delete_TimeRole_deleteTimeRole;
}

export interface Delete_TimeRoleVariables {
  id: string;
}
