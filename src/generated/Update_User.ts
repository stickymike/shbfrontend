/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Update_User
// ====================================================

export interface Update_User_updateUser {
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

export interface Update_User {
  updateUser: Update_User_updateUser | null;
}

export interface Update_UserVariables {
  email: string;
  lastName: string;
  firstName: string;
  code: number;
  id: string;
  title?: string | null;
}
