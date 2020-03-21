/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserWhereInput, Permission } from "./globalTypes";

// ====================================================
// GraphQL query operation: UsersWhereQ
// ====================================================

export interface UsersWhereQ_users_timeRoles {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface UsersWhereQ_users {
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
  timeRoles: UsersWhereQ_users_timeRoles[];
}

export interface UsersWhereQ {
  users: UsersWhereQ_users[];
}

export interface UsersWhereQVariables {
  query: UserWhereInput;
}
