/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Delete_User
// ====================================================

export interface Delete_User_deleteUser {
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

export interface Delete_User {
  deleteUser: Delete_User_deleteUser | null;
}

export interface Delete_UserVariables {
  id: string;
}
