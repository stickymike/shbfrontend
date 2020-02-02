/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTimeRequest
// ====================================================

export interface DeleteTimeRequest_deleteTimeRequest {
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

export interface DeleteTimeRequest {
  deleteTimeRequest: DeleteTimeRequest_deleteTimeRequest | null;
}

export interface DeleteTimeRequestVariables {
  id: string;
}
