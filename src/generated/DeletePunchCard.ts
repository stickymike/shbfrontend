/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePunchCard
// ====================================================

export interface DeletePunchCard_deletePunchCard {
  __typename: "PunchCard";
  id: string;
  punchIn: MyDateTime;
  punchOut: MyDateTime;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface DeletePunchCard {
  deletePunchCard: DeletePunchCard_deletePunchCard | null;
}

export interface DeletePunchCardVariables {
  id: string;
}
