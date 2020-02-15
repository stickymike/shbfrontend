/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PersonalUpdateTimeRequest
// ====================================================

export interface PersonalUpdateTimeRequest_updateTimeRequest {
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

export interface PersonalUpdateTimeRequest {
  updateTimeRequest: PersonalUpdateTimeRequest_updateTimeRequest | null;
}

export interface PersonalUpdateTimeRequestVariables {
  id: string;
  userId: string;
  startTime: MyDateTime;
  endTime: MyDateTime;
  reason: string;
  isAllDay: boolean;
  approved?: boolean | null;
}
