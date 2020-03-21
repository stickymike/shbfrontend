/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTimeRequest
// ====================================================

export interface DeleteTimeRequest_deleteTimeRequest {
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

export interface DeleteTimeRequest {
  deleteTimeRequest: DeleteTimeRequest_deleteTimeRequest | null;
}

export interface DeleteTimeRequestVariables {
  id: string;
}
