/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TimeRoleWhereUniqueInput, Permission } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Update_User_TimeRoles
// ====================================================

export interface Update_User_TimeRoles_updateUser_timeRoles {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

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
  permissions: Permission[];
  clockedIn: string;
  recentTimeRoleId: string;
  timeRoles: Update_User_TimeRoles_updateUser_timeRoles[];
}

export interface Update_User_TimeRoles {
  updateUser: Update_User_TimeRoles_updateUser | null;
}

export interface Update_User_TimeRolesVariables {
  id: string;
  timeID?: TimeRoleWhereUniqueInput[] | null;
}
