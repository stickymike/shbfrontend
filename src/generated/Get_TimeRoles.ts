/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Permission } from "./globalTypes";

// ====================================================
// GraphQL query operation: Get_TimeRoles
// ====================================================

export interface Get_TimeRoles_timeRoles_users {
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

export interface Get_TimeRoles_timeRoles {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  users: Get_TimeRoles_timeRoles_users[];
}

export interface Get_TimeRoles {
  timeRoles: Get_TimeRoles_timeRoles[];
}
