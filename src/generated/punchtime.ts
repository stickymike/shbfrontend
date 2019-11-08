/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Punchtype } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: punchtime
// ====================================================

export interface punchtime_createTimeCard {
  __typename: "TimeCard";
  id: string;
  punchTime: MyDateTime;
  punchType: Punchtype;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface punchtime {
  createTimeCard: punchtime_createTimeCard;
}

export interface punchtimeVariables {
  id: string;
  timeid: string;
  punchTime: MyDateTime;
  punchType: Punchtype;
}
