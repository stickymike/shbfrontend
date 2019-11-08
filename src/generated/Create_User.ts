/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Create_User
// ====================================================

export interface Create_User_createUser {
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

export interface Create_User {
  createUser: Create_User_createUser;
}

export interface Create_UserVariables {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  code: number;
  title?: string | null;
}
