/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignIn
// ====================================================

export interface SignIn_signin {
  __typename: "User";
  id: string;
}

export interface SignIn {
  signin: SignIn_signin;
}

export interface SignInVariables {
  email: string;
  password: string;
}
