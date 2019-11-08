/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Permissions } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Update_User_Permissions
// ====================================================

export interface Update_User_Permissions_updateUser {
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

export interface Update_User_Permissions {
  updateUser: Update_User_Permissions_updateUser | null;
}

export interface Update_User_PermissionsVariables {
  id: string;
  permissions?: Permissions[] | null;
}
