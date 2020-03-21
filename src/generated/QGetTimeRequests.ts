/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TimeRequestWhereInput, Permission } from "./globalTypes";

// ====================================================
// GraphQL query operation: QGetTimeRequests
// ====================================================

export interface QGetTimeRequests_timeRequests_user {
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

export interface QGetTimeRequests_timeRequests {
  __typename: "TimeRequest";
  id: string;
  startTime: MyDateTime;
  endTime: MyDateTime;
  approved: boolean | null;
  reason: string;
  isAllDay: boolean;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  user: QGetTimeRequests_timeRequests_user;
}

export interface QGetTimeRequests {
  timeRequests: QGetTimeRequests_timeRequests[];
}

export interface QGetTimeRequestsVariables {
  where: TimeRequestWhereInput;
}
