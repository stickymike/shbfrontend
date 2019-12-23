import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_TIMEROLES } from "../../../gql/queries/timeRoleQuery";
import SimpleMenu from "../../../components/Menu/SimpleMenu";
import { UPDATE_USER_TIMEROLES } from "../../../gql/mutations/userMut";
import useSimpleMenuProps from "../../../components/Menu/useSimpleMenuProps";
import { formatMoney } from "../../../helpers/formatMoney";
import EditDeleteField from "../../../components/CustomFields/EditDeleteField";

interface IProps {
  handleClose: (data: any) => void;
  formHandle: Function;
  user: any;
}

const UserTimeRoleSelector: React.FC<IProps> = ({
  user,
  handleClose,
  formHandle
}) => {
  const { timeRoles } = user;
  const [ids, setIds] = useState<string[]>(
    timeRoles.map(({ id }: { id: string }) => id)
  );
  const { data } = useQuery(GET_TIMEROLES);

  let serverTimeRoles: any = [];
  if (data) serverTimeRoles = data.timeRoles;

  const [updateUserTimeRoles] = useMutation(UPDATE_USER_TIMEROLES, {
    onCompleted: handleClose,
    variables: {
      id: user.id,
      timeID: ids.map((id: any) => ({
        id
      }))
    }
  });

  formHandle(updateUserTimeRoles);

  const getTimeRole = (id: string) => {
    const timeRole = timeRoles.find((timeRole: any) => timeRole.id === id);
    if (!timeRole)
      return serverTimeRoles.find((timeRole: any) => timeRole.id === id);
    return timeRole;
  };
  const myMenuClick = (id: string) => {
    if (id === null) return;
    if (ids.includes(id)) setIds([...ids].filter(newid => newid !== id));
    else setIds([...ids, id]);
  };

  const [menuClick, userMenuProps] = useSimpleMenuProps(
    serverTimeRoles
      .filter((timeRole: any) => !ids.includes(timeRole.id))
      .map((timeRole: any) => ({
        functionString: timeRole.id,
        text: `${timeRole.shortName} -  ${formatMoney(timeRole.payRate)}`
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
          const timeRole = getTimeRole(id);
          if (!timeRole) return ":(";
          return (
            <EditDeleteField
              key={timeRole.id}
              id={timeRole.id}
              onClick={handleclick}
            >
              <Typography variant="body2" display="inline">
                {timeRole.shortName}
              </Typography>
              <Typography variant="body2" display="inline">
                {" - "}
              </Typography>
              <Typography
                variant="body2"
                display="inline"
                style={{ fontStyle: "bold" }}
              >
                {formatMoney(timeRole.payRate)}
              </Typography>
              <Typography variant="caption" display="block">
                {timeRole.description}
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
        Add Role
      </Button>

      <SimpleMenu {...userMenuProps} />
    </>
  );
};

export default UserTimeRoleSelector;
