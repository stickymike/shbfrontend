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

export interface DateTimeFilter {
  equals?: MyDateTime | null;
  not?: MyDateTime | null;
  in?: MyDateTime[] | null;
  notIn?: MyDateTime[] | null;
  lt?: MyDateTime | null;
  lte?: MyDateTime | null;
  gt?: MyDateTime | null;
  gte?: MyDateTime | null;
}

export interface IntFilter {
  equals?: number | null;
  not?: number | null;
  in?: number[] | null;
  notIn?: number[] | null;
  lt?: number | null;
  lte?: number | null;
  gt?: number | null;
  gte?: number | null;
}

export interface NullableBooleanFilter {
  equals?: boolean | null;
  not?: boolean | null;
}

export interface NullableStringFilter {
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

export interface PunchCardFilter {
  every?: PunchCardWhereInput | null;
  some?: PunchCardWhereInput | null;
  none?: PunchCardWhereInput | null;
}

export interface PunchCardWhereInput {
  id?: StringFilter | null;
  punchIn?: DateTimeFilter | null;
  punchOut?: DateTimeFilter | null;
  updatedAt?: DateTimeFilter | null;
  createdAt?: DateTimeFilter | null;
  AND?: PunchCardWhereInput[] | null;
  OR?: PunchCardWhereInput[] | null;
  NOT?: PunchCardWhereInput[] | null;
  user?: UserWhereInput | null;
  timeRole?: TimeRoleWhereInput | null;
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

export interface TimeRequestFilter {
  every?: TimeRequestWhereInput | null;
  some?: TimeRequestWhereInput | null;
  none?: TimeRequestWhereInput | null;
}

export interface TimeRequestWhereInput {
  id?: StringFilter | null;
  reason?: StringFilter | null;
  approved?: NullableBooleanFilter | null;
  startTime?: DateTimeFilter | null;
  endTime?: DateTimeFilter | null;
  isAllDay?: NullableBooleanFilter | null;
  updatedAt?: DateTimeFilter | null;
  createdAt?: DateTimeFilter | null;
  AND?: TimeRequestWhereInput[] | null;
  OR?: TimeRequestWhereInput[] | null;
  NOT?: TimeRequestWhereInput[] | null;
  user?: UserWhereInput | null;
}

export interface TimeRoleFilter {
  every?: TimeRoleWhereInput | null;
  some?: TimeRoleWhereInput | null;
  none?: TimeRoleWhereInput | null;
}

export interface TimeRoleWhereInput {
  id?: StringFilter | null;
  name?: StringFilter | null;
  shortName?: StringFilter | null;
  description?: StringFilter | null;
  payRate?: IntFilter | null;
  users?: UserFilter | null;
  punchCards?: PunchCardFilter | null;
  updatedAt?: DateTimeFilter | null;
  createdAt?: DateTimeFilter | null;
  AND?: TimeRoleWhereInput[] | null;
  OR?: TimeRoleWhereInput[] | null;
  NOT?: TimeRoleWhereInput[] | null;
}

export interface TimeRoleWhereUniqueInput {
  id?: string | null;
}

export interface UserFilter {
  every?: UserWhereInput | null;
  some?: UserWhereInput | null;
  none?: UserWhereInput | null;
}

export interface UserWhereInput {
  id?: StringFilter | null;
  code?: IntFilter | null;
  email?: StringFilter | null;
  password?: StringFilter | null;
  firstName?: StringFilter | null;
  lastName?: StringFilter | null;
  title?: NullableStringFilter | null;
  createdAt?: DateTimeFilter | null;
  updatedAt?: DateTimeFilter | null;
  timeRoles?: TimeRoleFilter | null;
  punchCards?: PunchCardFilter | null;
  events?: TimeRequestFilter | null;
  AND?: UserWhereInput[] | null;
  OR?: UserWhereInput[] | null;
  NOT?: UserWhereInput[] | null;
}

export interface UserWhereUniqueInput {
  id?: string | null;
  code?: number | null;
  email?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
