/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserWhereUniqueInput, Permission } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Update_TimeRoles_Users
// ====================================================

export interface Update_TimeRoles_Users_updateTimeRole_users {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  title: string | null;
  code: number;
  email: string;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  permissions: Permission[];
  clockedIn: string;
  recentTimeRoleId: string;
}

export interface Update_TimeRoles_Users_updateTimeRole {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  users: Update_TimeRoles_Users_updateTimeRole_users[];
}

export interface Update_TimeRoles_Users {
  updateTimeRole: Update_TimeRoles_Users_updateTimeRole | null;
}

export interface Update_TimeRoles_UsersVariables {
  id: string;
  userID?: UserWhereUniqueInput[] | null;
}
