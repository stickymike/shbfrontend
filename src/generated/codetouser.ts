/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Permission } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: codetouser
// ====================================================

export interface codetouser_clockcodetouser_timeRoles {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface codetouser_clockcodetouser {
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
  timeRoles: codetouser_clockcodetouser_timeRoles[];
}

export interface codetouser {
  clockcodetouser: codetouser_clockcodetouser;
}

export interface codetouserVariables {
  code: number;
}
