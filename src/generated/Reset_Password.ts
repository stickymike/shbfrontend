/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Reset_Password
// ====================================================

export interface Reset_Password_resetPassword {
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

export interface Reset_Password {
  resetPassword: Reset_Password_resetPassword;
}

export interface Reset_PasswordVariables {
  id: string;
  password: string;
}
