/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTimeRequest
// ====================================================

export interface CreateTimeRequest_createTimeRequest {
  __typename: "TimeRequest";
  id: string;
  startTime: MyDateTime;
  endTime: MyDateTime;
  approved: boolean | null;
  reason: string;
  isAllDay: boolean;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
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
  approved?: boolean | null;
}
