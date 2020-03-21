/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: punchcardsuseriddate
// ====================================================

export interface punchcardsuseriddate_punchCards_timeRole {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface punchcardsuseriddate_punchCards {
  __typename: "PunchCard";
  id: string;
  punchIn: MyDateTime;
  punchOut: MyDateTime;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  timeRole: punchcardsuseriddate_punchCards_timeRole;
}

export interface punchcardsuseriddate {
  punchCards: punchcardsuseriddate_punchCards[];
}

export interface punchcardsuseriddateVariables {
  id: string;
  date: MyDateTime;
}
