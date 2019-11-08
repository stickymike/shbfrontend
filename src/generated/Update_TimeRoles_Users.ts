/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserWhereUniqueInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Update_TimeRoles_Users
// ====================================================

export interface Update_TimeRoles_Users_updateTimeRole {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface Update_TimeRoles_Users {
  updateTimeRole: Update_TimeRoles_Users_updateTimeRole | null;
}

export interface Update_TimeRoles_UsersVariables {
  id: string;
  userID?: UserWhereUniqueInput[] | null;
}
