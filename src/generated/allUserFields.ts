/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./globalTypes";

// ====================================================
// GraphQL fragment: allUserFields
// ====================================================

export interface allUserFields {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  title: string | null;
  code: number;
  email: string;
  updatedAt: MyDateTime;
  createdAt: MyDateTime;
  permissions: Permissions[];
  clockedIn: string;
  recentTimeRoleId: string;
}
