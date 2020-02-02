/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTimeRequest
// ====================================================

export interface CreateTimeRequest_createTimeRequest {
  __typename: "TimeRequest";
  id: string;
  startTime: MyDateTime;
  endTime: MyDateTime;
  approved: boolean;
  reason: string;
  isAllDay: boolean;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  userUpdatedAt: MyDateTime | null;
}

export interface CreateTimeRequest {
  createTimeRequest: CreateTimeRequest_createTimeRequest;
}

export interface CreateTimeRequestVariables {
  userId: string;
  startTime: MyDateTime;
  endTime: MyDateTime;
  reason: string;
  isAllDay: boolean;
  approved: boolean;
}
