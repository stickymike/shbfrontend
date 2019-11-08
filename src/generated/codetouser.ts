/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Permissions, Punchtype } from "./globalTypes";

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

export interface codetouser_clockcodetouser_timeCards_timeRole {
  __typename: "TimeRole";
  id: string;
}

export interface codetouser_clockcodetouser_timeCards {
  __typename: "TimeCard";
  id: string;
  punchTime: MyDateTime;
  punchType: Punchtype;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  timeRole: codetouser_clockcodetouser_timeCards_timeRole;
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
  permissions: Permissions[];
  clockedIn: string;
  recentTimeRoleId: string;
  timeRoles: codetouser_clockcodetouser_timeRoles[] | null;
  timeCards: codetouser_clockcodetouser_timeCards[] | null;
}

export interface codetouser {
  clockcodetouser: codetouser_clockcodetouser;
}

export interface codetouserVariables {
  code: number;
}
