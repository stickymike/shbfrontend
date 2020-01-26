/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: allTimeRequestFields
// ====================================================

export interface allTimeRequestFields {
  __typename: "TimeRequest";
  id: string;
  startTime: MyDateTime;
  endTime: MyDateTime;
  approved: boolean | null;
  reason: string;
  isAllDay: boolean | null;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}
