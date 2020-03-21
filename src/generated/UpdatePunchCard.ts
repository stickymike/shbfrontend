/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePunchCard
// ====================================================

export interface UpdatePunchCard_updatePunchCard {
  __typename: "PunchCard";
  id: string;
  punchIn: MyDateTime;
  punchOut: MyDateTime;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface UpdatePunchCard {
  updatePunchCard: UpdatePunchCard_updatePunchCard | null;
}

export interface UpdatePunchCardVariables {
  id: string;
  userId: string;
  timeRoleId: string;
  punchIn: MyDateTime;
  punchOut: MyDateTime;
}
