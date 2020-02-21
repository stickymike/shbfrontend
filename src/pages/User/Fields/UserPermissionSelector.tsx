import React, { useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { UPDATE_USER_PERMISSIONS } from "../../../gql/mutations/userMut";
import makeStyles from "@material-ui/styles/makeStyles";
// import gql from "graphql-tag";
import MyLoading from "../../../components/MyLoading";
import getInnerText from "../../../helpers/getInnerText";
import AddRemoveField from "../../../components/CustomFields/AddRemoveField";
import { GET_PERMISSIONS } from "../../../gql/queries/miscQuery";

const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    minWidth: "300px"
  }
}));

interface IProps {
  handleClose: (data: any) => void;
  formHandle: Function;
  user: any;
}

const UserPermissionSelector: React.FC<IProps> = ({
  user,
  handleClose,
  formHandle
}) => {
  const { id } = user;
  const { wrapper } = useStyles();
  const [permissions, setPermissions] = useState(user.permissions);

  const [updateUserPerms] = useMutation(UPDATE_USER_PERMISSIONS, {
    onCompleted: handleClose,
    variables: { id, permissions }
  });

  formHandle(updateUserPerms);

  const { data, loading } = useQuery(GET_PERMISSIONS);
  const qPermissions =
    data && data["__type"]
      ? data["__type"].enumValues.map((e: any) => e.name)
      : [];

  if (loading) return <MyLoading />;

  const handleclick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const perm = getInnerText(e.target);
    if (permissions.includes(perm))
      setPermissions([...permissions].filter(newperm => newperm !== perm));
    else setPermissions([...permissions, perm]);
  };

  return (
    <div className={wrapper}>
      {qPermissions.map((name: string, i: number) => (
        <AddRemoveField
          onClick={handleclick}
          label={name}
          selected={permissions.includes(name)}
          key={i}
        />
      ))}
    </div>
  );
};

export default UserPermissionSelector;
