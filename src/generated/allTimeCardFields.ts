/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Punchtype } from "./globalTypes";

// ====================================================
// GraphQL fragment: allTimeCardFields
// ====================================================

export interface allTimeCardFields {
  __typename: "TimeCard";
  id: string;
  punchTime: MyDateTime;
  punchType: Punchtype;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
}
