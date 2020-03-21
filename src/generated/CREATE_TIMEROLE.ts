/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CREATE_TIMEROLE
// ====================================================

export interface CREATE_TIMEROLE_createTimeRole {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface CREATE_TIMEROLE {
  createTimeRole: CREATE_TIMEROLE_createTimeRole;
}

export interface CREATE_TIMEROLEVariables {
  name: string;
  shortName: string;
  description: string;
  payRate: number;
}
