/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getNewMe
// ====================================================

export interface getNewMe_me {
  __typename: "User";
  id: string;
  lastName: string;
  clockedIn: string;
}

export interface getNewMe {
  me: getNewMe_me | null;
}
