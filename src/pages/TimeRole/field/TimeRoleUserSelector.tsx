import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USERS } from "../../../gql/queries/userQuery";
import { UPDATE_TIMEROLE_USERS } from "../../../gql/mutations/timeRoleMut";
import useSimpleMenuProps from "../../../components/Menu/useSimpleMenuProps";
import EditDeleteField from "../../../components/CustomFields/EditDeleteField";
import SimpleMenu from "../../../components/Menu/SimpleMenu";

interface IProps {
  handleClose: (data: any) => void;
  formHandle: Function;
  timeRole: any;
}

const TimeRoleUserSelector: React.FC<IProps> = ({
  timeRole,
  handleClose,
  formHandle
}) => {
  const { users: timeRoleUsers } = timeRole;
  const [ids, setIds] = useState<string[]>(
    timeRoleUsers.map(({ id }: { id: string }) => id)
  );
  const { data } = useQuery(GET_USERS);

  let serverUsers: any = [];
  if (data) serverUsers = data.users;

  const [updateUserTimeRoles] = useMutation(UPDATE_TIMEROLE_USERS, {
    onCompleted: handleClose,
    variables: {
      id: timeRole.id,
      userID: ids.map((id: any) => ({
        id
      }))
    }
  });

  formHandle(updateUserTimeRoles);

  const getUser = (id: string) => {
    const user = timeRoleUsers.find((timeRole: any) => timeRole.id === id);
    if (!user) return serverUsers.find((timeRole: any) => timeRole.id === id);
    return user;
  };
  const myMenuClick = (id: string) => {
    if (id === null) return;
    if (ids.includes(id)) setIds([...ids].filter(newid => newid !== id));
    else setIds([...ids, id]);
  };

  const [menuClick, userMenuProps] = useSimpleMenuProps(
    serverUsers
      .filter((user: any) => !ids.includes(user.id))
      .map((user: any) => ({
        functionString: user.id,
        text: `${user.firstName} ${user.lastName}`
      })),
    myMenuClick
  );

  const handleclick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const id = e.currentTarget.getAttribute("data-id");
    if (id === null) return;
    if (ids.includes(id)) setIds([...ids].filter(newid => newid !== id));
    else setIds([...ids, id]);
  };
  return (
    <>
      <div
        style={{
          minWidth: "200px",
          minHeight: "200px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {ids.map((id: any) => {
          const user = getUser(id);
          if (!user) return ":(";
          return (
            <EditDeleteField key={user.id} id={user.id} onClick={handleclick}>
              <Typography variant="body2" display="inline">
                {`${user.firstName} ${user.lastName}`}
              </Typography>
              <Typography variant="caption" display="block">
                {user.title || "No Title"}
              </Typography>
            </EditDeleteField>
          );
        })}
      </div>
      <Button
        color="primary"
        variant="text"
        style={{ position: "absolute", transform: "translate(-16px, 16px)" }}
        onClick={menuClick}
      >
        <AddCircleOutlineOutlinedIcon
          style={{ marginRight: "8px" }}
          color="primary"
        />
        Add User
      </Button>

      <SimpleMenu {...userMenuProps} />
    </>
  );
};

export default TimeRoleUserSelector;
