/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTimeRequestsIDandDates
// ====================================================

export interface GetTimeRequestsIDandDates_timeRequests {
  __typename: "TimeRequest";
  id: string;
  startTime: MyDateTime;
  endTime: MyDateTime;
  approved: boolean;
  reason: string;
  isAllDay: boolean;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  adminSeen: boolean | null;
}

export interface GetTimeRequestsIDandDates {
  timeRequests: GetTimeRequestsIDandDates_timeRequests[];
}

export interface GetTimeRequestsIDandDatesVariables {
  userId: string;
  startTimeShown: MyDateTime;
  endTimeShown: MyDateTime;
}
