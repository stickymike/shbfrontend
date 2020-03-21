/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Permission } from "./globalTypes";

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
  permissions: Permission[];
  clockedIn: string;
  recentTimeRoleId: string;
}

export interface Update_User_Permissions {
  updateUser: Update_User_Permissions_updateUser | null;
}

export interface Update_User_PermissionsVariables {
  id: string;
  permissions?: Permission[] | null;
}
