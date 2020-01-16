import React from "react";

import { useQuery } from "react-apollo";
import number2Words from "../../helpers/number2Words";
import MyChip from "../../components/Table/MyChip";
import { headerCell } from "../../components/Table/EnhancedTableHead";
import { GET_TIMEROLES } from "../../gql/queries/timeRoleQuery";
import TimeRoleTable from "./TimeRoleTable";
import {
  GetTimeRoles,
  GetTimeRoles_timeRoles,
  GetTimeRoles_timeRoles_users
} from "../../generated/GetTimeRoles";
import { formatMoney } from "../../helpers/formatMoney";

const formatUserText = (users: GetTimeRoles_timeRoles_users[]) => {
  const getFullName = (user: GetTimeRoles_timeRoles_users) =>
    `${user.firstName} ${user.lastName}`;
  switch (users.length) {
    case 0:
      return "No Users";
    case 1:
      return getFullName(users[0]);
    default:
      const num = number2Words(users.length);
      return `${num.charAt(0).toUpperCase() +
        num.slice(1)} Users: ${users
        .reduce((acc, user) => `${acc} ${getFullName(user)},`, "")
        .slice(0, -1)}`;
  }
};

export interface morphData extends GetTimeRoles_timeRoles {
  formatedNumber: string;
}

const morphData = (timeRoles: GetTimeRoles_timeRoles[]) => {
  if (timeRoles) {
    return timeRoles.map(timeRole => {
      return {
        allUsers: formatUserText(timeRole.users),
        numUsers: timeRole.users.length,
        formatedNumber: formatMoney(timeRole.payRate),
        ...timeRole
      };
    });
  }
  return [];
};

const header: headerCell<any>[] = [
  {
    id: "name",
    label: "Name",
    cellProps: { align: "left", style: { width: "10%" } }
  },
  {
    id: "formatedNumber",
    orderBy: "payRate",
    label: "Pay Rate",
    cellProps: { align: "center" }
  },
  {
    id: "description",
    label: "Description",
    cellProps: { align: "center" }
  },
  {
    id: "allUsers",
    label: "Users",
    cellProps: {
      align: "right"
    },
    orderBy: "numUsers",
    renderComp: MyChip
  }
  // {
  //   id: "allPermissions",
  //   label: "Permissions",
  //   cellProps: { align: "right" },
  //   orderBy: "numPermissions",
  //   renderComp: MyChip
  // },
  // {
  //   id: "allTimeRoles",
  //   label: "Time Roles",
  //   cellProps: { align: "right" },
  //   orderBy: "numTimeRoles",
  //   renderComp: MyChip
  // }
];

interface IProps {
  returnFunction: (arg: any) => JSX.Element | undefined;
}

const TimeRoleTableWrapper: React.FC<IProps> = ({ returnFunction }) => {
  const { data, ...qResults } = useQuery<GetTimeRoles>(GET_TIMEROLES, {
    notifyOnNetworkStatusChange: true
  });

  let timeRoles: morphData[] = [] as morphData[];
  if (data) timeRoles = morphData(data.timeRoles);

  return (
    returnFunction(qResults) || (
      <TimeRoleTable header={header} data={timeRoles} />
    )
  );
};

export default TimeRoleTableWrapper;
