/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./globalTypes";

// ====================================================
// GraphQL query operation: PunchCardById
// ====================================================

export interface PunchCardById_punchCard_user {
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

export interface PunchCardById_punchCard_timeRole {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface PunchCardById_punchCard {
  __typename: "PunchCard";
  id: string;
  punchIn: MyDateTime;
  punchOut: MyDateTime;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  user: PunchCardById_punchCard_user;
  timeRole: PunchCardById_punchCard_timeRole;
}

export interface PunchCardById {
  punchCard: PunchCardById_punchCard | null;
}

export interface PunchCardByIdVariables {
  id: string;
}
