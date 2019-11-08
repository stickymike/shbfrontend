/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Permissions {
  ADMIN = "ADMIN",
  TIMECARDEDITOR = "TIMECARDEDITOR",
  TIMECARDVIEWER = "TIMECARDVIEWER",
  USER = "USER",
}

export enum Punchtype {
  CLOCKIN = "CLOCKIN",
  CLOCKOUT = "CLOCKOUT",
}

export interface QueryFindManyPunchCardFilter {
  equals?: MyDateTime | null;
  not?: MyDateTime | null;
  in?: MyDateTime[] | null;
  notIn?: MyDateTime[] | null;
  lt?: MyDateTime | null;
  lte?: MyDateTime | null;
  gt?: MyDateTime | null;
  gte?: MyDateTime | null;
}

export interface QueryFindManyPunchCardWhereInput {
  id?: StringFilter | null;
  punchIn?: QueryFindManyPunchCardFilter | null;
  punchOut?: QueryFindManyPunchCardFilter | null;
  updatedAt?: QueryFindManyPunchCardFilter | null;
  createdAt?: QueryFindManyPunchCardFilter | null;
  AND?: QueryFindManyPunchCardWhereInput[] | null;
  OR?: QueryFindManyPunchCardWhereInput[] | null;
  NOT?: QueryFindManyPunchCardWhereInput[] | null;
  user?: QueryFindManyPunchCardWhereInput | null;
  timeRole?: QueryFindManyPunchCardWhereInput | null;
}

export interface QueryFindManyTimeCardFilter {
  equals?: MyDateTime | null;
  not?: MyDateTime | null;
  in?: MyDateTime[] | null;
  notIn?: MyDateTime[] | null;
  lt?: MyDateTime | null;
  lte?: MyDateTime | null;
  gt?: MyDateTime | null;
  gte?: MyDateTime | null;
}

export interface QueryFindManyTimeCardWhereInput {
  id?: StringFilter | null;
  punchTime?: QueryFindManyTimeCardFilter | null;
  punchType?: QueryFindManyTimeCardFilter | null;
  updatedAt?: QueryFindManyTimeCardFilter | null;
  createdAt?: QueryFindManyTimeCardFilter | null;
  AND?: QueryFindManyTimeCardWhereInput[] | null;
  OR?: QueryFindManyTimeCardWhereInput[] | null;
  NOT?: QueryFindManyTimeCardWhereInput[] | null;
  user?: QueryFindManyTimeCardWhereInput | null;
  timeRole?: QueryFindManyTimeCardWhereInput | null;
}

export interface StringFilter {
  equals?: string | null;
  not?: string | null;
  in?: string[] | null;
  notIn?: string[] | null;
  lt?: string | null;
  lte?: string | null;
  gt?: string | null;
  gte?: string | null;
  contains?: string | null;
  startsWith?: string | null;
  endsWith?: string | null;
}

export interface TimeRoleWhereUniqueInput {
  id?: string | null;
}

export interface UserWhereUniqueInput {
  id?: string | null;
  code?: number | null;
  email?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
