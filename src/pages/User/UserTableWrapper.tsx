import React from "react";
import moment from "moment";

import { useQuery } from "react-apollo";
import { PunchCardsWhereQ_punchCards } from "../../generated/PunchCardsWhereQ";

import MyLoading from "../../components/MyLoading";
import { USERS_WHEREQ } from "../../gql/queries/userQuery";
import UserTable from "./UserTable";
import { UsersWhereQ_users } from "../../generated/UsersWhereQ";

// interface morphData {
//   id: string;
//   userName: string;
//   date: string;
//   punchIn: string;
//   punchOut: string;
//   timeRole: string;
//   hours: string;
//   workedMS: number;
// }

const formatTimeRoleText = (timeRoles: UsersWhereQ_users["timeRoles"]) => {
  switch (timeRoles.length) {
    case 0:
      return "No Roles";
    case 1:
      return timeRoles[0].name;
    default:
      const num = number2words(timeRoles.length);
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
      const num = number2words(newPerms.length);
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
    optout: true
  },
  {
    id: "allTimeRoles",
    numeric: true,
    disablePadding: false,
    label: "Time Roles",
    props: { align: "right" },
    optout: true
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
  setRefresh: (arg: boolean) => void;
  loading: any;
}

const UserTableWrapper: React.FC<IProps> = ({
  refresh,
  setRefresh,
  loading
}) => {
  const { data, refetch, networkStatus } = useQuery(USERS_WHEREQ, {
    variables: { query: {} },
    notifyOnNetworkStatusChange: true
  });

  if (refresh) {
    refetch();
    setRefresh(!refresh);
  }

  if (networkStatus === 1) return <MyLoading />;
  if (networkStatus === 4) loading(true);
  else loading(false);

  let users: UsersWhereQ_users[] = [] as UsersWhereQ_users[];
  if (data) users = morphData(data.users);
  console.log(users);

  return <UserTable header={header} data={users} />;
};

export default UserTableWrapper;

var num = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(
  " "
);
var tens = "twenty thirty forty fifty sixty seventy e ighty ninety".split(" ");

function number2words(n: number): string {
  if (n < 20) return num[n];
  var digit = n % 10;
  if (n < 100) return tens[~~(n / 10) - 2] + (digit ? "-" + num[digit] : "");
  if (n < 1000)
    return (
      num[~~(n / 100)] +
      " hundred" +
      (n % 100 == 0 ? "" : " " + number2words(n % 100))
    );
  return (
    number2words(~~(n / 1000)) +
    " thousand" +
    (n % 1000 != 0 ? " " + number2words(n % 1000) : "")
  );
}
