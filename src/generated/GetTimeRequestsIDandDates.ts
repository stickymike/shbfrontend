/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Permission } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetTimeRequestsIDandDates
// ====================================================

export interface GetTimeRequestsIDandDates_timeRequests_user {
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

export interface GetTimeRequestsIDandDates_timeRequests {
  __typename: "TimeRequest";
  id: string;
  startTime: MyDateTime;
  endTime: MyDateTime;
  approved: boolean | null;
  reason: string;
  isAllDay: boolean;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  user: GetTimeRequestsIDandDates_timeRequests_user;
}

export interface GetTimeRequestsIDandDates {
  timeRequests: GetTimeRequestsIDandDates_timeRequests[];
}

export interface GetTimeRequestsIDandDatesVariables {
  userId: string;
  startTimeShown: MyDateTime;
  endTimeShown: MyDateTime;
}
