/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: punchoutpunchcard
// ====================================================

export interface punchoutpunchcard_updatePunchCard {
  __typename: "PunchCard";
  id: string;
  punchIn: MyDateTime;
  punchOut: MyDateTime;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface punchoutpunchcard {
  updatePunchCard: punchoutpunchcard_updatePunchCard | null;
}

export interface punchoutpunchcardVariables {
  cardId: string;
  punchOut: MyDateTime;
}
