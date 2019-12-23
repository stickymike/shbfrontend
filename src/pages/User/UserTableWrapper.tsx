import React from "react";

import { useQuery } from "react-apollo";
import { USERS_WHEREQ } from "../../gql/queries/userQuery";
import UserTable from "./UserTable";
import { UsersWhereQ_users } from "../../generated/UsersWhereQ";
import number2Words from "../../helpers/number2Words";
import MyChip from "../../components/Table/MyChip";
import { headerCell } from "../../components/Table/EnhancedTableHead";

const formatTimeRoleText = (timeRoles: UsersWhereQ_users["timeRoles"]) => {
  switch (timeRoles.length) {
    case 0:
      return "No Roles";
    case 1:
      return timeRoles[0].name;
    default:
      const num = number2Words(timeRoles.length);
      return `${num.charAt(0).toUpperCase() +
        num.slice(1)} Roles: ${timeRoles
        .reduce((acc, timeRole) => `${acc} ${timeRole.name},`, "")
        .slice(0, -1)}`;
  }
};

const formatPermissionText = (perms: UsersWhereQ_users["permissions"]) => {
  const newPerms = perms.map(perm => {
    return (
      perm
        .toLocaleLowerCase()
        .charAt(0)
        .toUpperCase() + perm.toLocaleLowerCase().slice(1)
    );
  });
  switch (newPerms.length) {
    case 0:
      return "No Permissions";
    case 1:
      return newPerms[0];
    default:
      const num = number2Words(newPerms.length);
      return `${num.charAt(0).toUpperCase() +
        num.slice(1)} Perms: ${newPerms
        .reduce((acc, timeRole) => `${acc} ${timeRole},`, "")
        .slice(0, -1)}`;
  }
};
export interface morphData extends UsersWhereQ_users {
  numPermissions: string;
  numTimeRoles: string;
  name: string;
  allPermissions: string;
  allTimeRoles: string;
}

const morphData = (users: UsersWhereQ_users[]) => {
  if (users) {
    return users.map(user => {
      formatPermissionText(user.permissions);

      return {
        numPermissions: user.permissions.length,
        numTimeRoles: user.timeRoles.length,
        name: `${user.firstName} ${user.lastName}`,
        allPermissions: formatPermissionText(user.permissions),
        allTimeRoles: formatTimeRoleText(user.timeRoles),
        ...user
      };
    });
  }
  return [];
};

const header: headerCell<morphData>[] = [
  {
    id: "name",
    label: "Name",
    cellProps: { align: "left" }
  },
  {
    id: "email",
    label: "Email",
    cellProps: { align: "center" }
  },
  {
    id: "allPermissions",
    label: "Permissions",
    cellProps: { align: "right" },
    orderBy: "numPermissions",
    renderComp: MyChip
  },
  {
    id: "allTimeRoles",
    label: "Time Roles",
    cellProps: { align: "right" },
    orderBy: "numTimeRoles",
    renderComp: MyChip
  }
];

interface IProps {
  returnFunction: (arg: any) => JSX.Element | undefined;
}

const UserTableWrapper: React.FC<IProps> = ({ returnFunction }) => {
  const { data, ...qResults } = useQuery(USERS_WHEREQ, {
    variables: { query: {} },
    notifyOnNetworkStatusChange: true
  });

  let users: UsersWhereQ_users[] = [] as UsersWhereQ_users[];
  if (data) users = morphData(data.users);

  return returnFunction(qResults) || <UserTable header={header} data={users} />;
};

export default UserTableWrapper;
