/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Permission } from "./globalTypes";

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me_timeRoles {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface Me_me {
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
  timeRoles: Me_me_timeRoles[];
}

export interface Me {
  me: Me_me | null;
}
