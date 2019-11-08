/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Punchtype } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Update_TimeCard
// ====================================================

export interface Update_TimeCard_updateTimeCard {
  __typename: "TimeCard";
  id: string;
  punchTime: MyDateTime;
  punchType: Punchtype;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface Update_TimeCard {
  updateTimeCard: Update_TimeCard_updateTimeCard | null;
}

export interface Update_TimeCardVariables {
  tid: string;
  id: string;
  timeid: string;
  punchTime: MyDateTime;
  punchType: Punchtype;
}
