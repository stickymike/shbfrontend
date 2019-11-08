/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Update_TimeRole
// ====================================================

export interface Update_TimeRole_updateTimeRole {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface Update_TimeRole {
  updateTimeRole: Update_TimeRole_updateTimeRole | null;
}

export interface Update_TimeRoleVariables {
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
}
