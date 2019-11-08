/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Punchtype } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Delete_TimeCard
// ====================================================

export interface Delete_TimeCard_deleteTimeCard {
  __typename: "TimeCard";
  id: string;
  punchTime: MyDateTime;
  punchType: Punchtype;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface Delete_TimeCard {
  deleteTimeCard: Delete_TimeCard_deleteTimeCard | null;
}

export interface Delete_TimeCardVariables {
  id: string;
}
