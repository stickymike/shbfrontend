/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Permissions, Punchtype } from "./globalTypes";

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

export interface Me_me_timeCards_timeRole {
  __typename: "TimeRole";
  id: string;
}

export interface Me_me_timeCards {
  __typename: "TimeCard";
  id: string;
  punchTime: MyDateTime;
  punchType: Punchtype;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  timeRole: Me_me_timeCards_timeRole;
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
  permissions: Permissions[];
  clockedIn: string;
  recentTimeRoleId: string;
  timeRoles: Me_me_timeRoles[] | null;
  timeCards: Me_me_timeCards[] | null;
}

export interface Me {
  me: Me_me | null;
}
