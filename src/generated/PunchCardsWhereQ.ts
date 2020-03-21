/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PunchCardWhereInput, Permission } from "./globalTypes";

// ====================================================
// GraphQL query operation: PunchCardsWhereQ
// ====================================================

export interface PunchCardsWhereQ_punchCards_user {
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

export interface PunchCardsWhereQ_punchCards_timeRole {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface PunchCardsWhereQ_punchCards {
  __typename: "PunchCard";
  id: string;
  punchIn: MyDateTime;
  punchOut: MyDateTime;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  user: PunchCardsWhereQ_punchCards_user;
  timeRole: PunchCardsWhereQ_punchCards_timeRole;
}

export interface PunchCardsWhereQ {
  punchCards: PunchCardsWhereQ_punchCards[];
}

export interface PunchCardsWhereQVariables {
  query: PunchCardWhereInput;
}
