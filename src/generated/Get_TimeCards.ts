/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Punchtype, Permissions } from "./globalTypes";

// ====================================================
// GraphQL query operation: Get_TimeCards
// ====================================================

export interface Get_TimeCards_timeCards_user {
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

export interface Get_TimeCards_timeCards_timeRole {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface Get_TimeCards_timeCards {
  __typename: "TimeCard";
  id: string;
  punchTime: MyDateTime;
  punchType: Punchtype;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  user: Get_TimeCards_timeCards_user;
  timeRole: Get_TimeCards_timeCards_timeRole;
}

export interface Get_TimeCards {
  timeCards: Get_TimeCards_timeCards[] | null;
}
