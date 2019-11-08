/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TimeRoleWhereUniqueInput, Permissions } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Update_User_TimeRoles
// ====================================================

export interface Update_User_TimeRoles_updateUser {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  title: string | null;
  code: number;
  email: string;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  permissions: Permissions[];
  clockedIn: string;
  recentTimeRoleId: string;
}

export interface Update_User_TimeRoles {
  updateUser: Update_User_TimeRoles_updateUser | null;
}

export interface Update_User_TimeRolesVariables {
  id: string;
  timeID?: TimeRoleWhereUniqueInput[] | null;
}
