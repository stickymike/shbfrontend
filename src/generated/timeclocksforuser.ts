/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Punchtype } from "./globalTypes";

// ====================================================
// GraphQL query operation: timeclocksforuser
// ====================================================

export interface timeclocksforuser_timeCards_timeRole {
  __typename: "TimeRole";
  id: string;
  name: string;
  shortName: string;
  description: string;
  payRate: number;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}

export interface timeclocksforuser_timeCards {
  __typename: "TimeCard";
  id: string;
  punchTime: MyDateTime;
  punchType: Punchtype;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  timeRole: timeclocksforuser_timeCards_timeRole;
}

export interface timeclocksforuser {
  timeCards: timeclocksforuser_timeCards[] | null;
}

export interface timeclocksforuserVariables {
  id: string;
  date: MyDateTime;
}
