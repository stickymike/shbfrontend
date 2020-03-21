/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: newpunchcard
// ====================================================

export interface newpunchcard_createPunchCard {
  __typename: "PunchCard";
  id: string;
  punchIn: MyDateTime;
  punchOut: MyDateTime;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface newpunchcard {
  createPunchCard: newpunchcard_createPunchCard;
}

export interface newpunchcardVariables {
  userId: string;
  timeRoleId: string;
  punchIn: MyDateTime;
  punchOut: MyDateTime;
}
