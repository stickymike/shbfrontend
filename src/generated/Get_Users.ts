/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./globalTypes";

// ====================================================
// GraphQL query operation: Get_Users
// ====================================================

export interface Get_Users_users_timeRoles {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface Get_Users_users {
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
  timeRoles: Get_Users_users_timeRoles[] | null;
}

export interface Get_Users {
  users: Get_Users_users[] | null;
}
