import React from "react";

import { useQuery } from "react-apollo";
import MyLoading from "../../components/MyLoading";
import { USERS_WHEREQ } from "../../gql/queries/userQuery";
import UserTable from "./UserTable";
import { UsersWhereQ_users } from "../../generated/UsersWhereQ";
import number2Words from "../../helpers/number2Words";

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

const header = [
  // {
  //   id: "firstName",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "First Name",
  //   props: { padding: "none" }
  // },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
    props: { align: "left" }
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
    props: { align: "center" }
  },
  {
    id: "allPermissions",
    numeric: true,
    disablePadding: false,
    label: "Permissions",
    props: { align: "right" },
    optout: true,
    orderBy: "numPermissions"
  },
  {
    id: "allTimeRoles",
    numeric: true,
    disablePadding: false,
    label: "Time Roles",
    props: { align: "right" },
    optout: true,
    orderBy: "numTimeRoles"
  }
  // {
  //   id: "punchOut",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Clock Out",
  //   props: { align: "right" },
  //   orderBy: "endSort"
  // },
  // {
  //   id: "timeRole",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Role",
  //   props: { align: "right" }
  // },

  // {
  //   id: "hours",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Hours",
  //   props: { align: "right", padding: "none" }
  // }
];

interface IProps {
  refresh: boolean;
  setRefresh?: (arg: boolean) => void;
  loading: any;
}

const UserTableWrapper: React.FC<IProps> = ({ refresh, loading }) => {
  const { data, refetch, networkStatus } = useQuery(USERS_WHEREQ, {
    variables: { query: {} },
    notifyOnNetworkStatusChange: true
  });

  if (refresh) refetch();

  if (networkStatus === 1) return <MyLoading />;
  if (networkStatus === 4) loading(true);
  else loading(false);

  let users: UsersWhereQ_users[] = [] as UsersWhereQ_users[];
  if (data) users = morphData(data.users);

  return <UserTable header={header} data={users} />;
};

export default UserTableWrapper;
