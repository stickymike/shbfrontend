import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { Chip, Theme, Tooltip, Typography } from "@material-ui/core";
import ItemSquareStyleWrapper from "../../components/ItemSquareStyleWrapper";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/styles/makeStyles";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { spacing } from "@material-ui/system";

import EditSharpIcon from "@material-ui/icons/EditSharp";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import MyLoading from "../../components/MyLoading";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_TIMEROLES } from "../../gql/queries/timeRoleQuery";
import SimpleMenu from "./SimpleMenu";
import useMenuProps from "../../components/Menu/useMenuProps";
import { UPDATE_USER_TIMEROLES } from "../../gql/mutations/userMut";

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
  const { data, loading } = useQuery(GET_TIMEROLES);

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
  const [menuClick, userMenuProps] = useMenuProps(
    serverTimeRoles
      .filter((timeRole: any) => !ids.includes(timeRole.id))
      .map((timeRole: any) => ({
        display: timeRole.shortName,
        location: timeRole.id,
        color: "primary"
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
              label={`${timeRole.shortName} - ${formatMoney(
                timeRole.payRate
              )}: ${timeRole.description}`}
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

const formatMoney = (weirdMoney: number) => {
  const remainder = weirdMoney % 100;
  if (remainder === 0) return `$${Math.ceil(weirdMoney / 100)}.00`;
  return `$${Math.ceil(weirdMoney / 100)}.${weirdMoney % 100}`;
};

interface Props {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selected?: boolean;
  key: number;
  id: string;
}
const useStyles = makeStyles((theme: Theme) => ({
  squareDiv: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(13),
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    // color: theme.palette.getContrastText(backgroundColor),
    // backgroundColor: backgroundColor,
    borderRadius: 32 / 2,
    whiteSpace: "nowrap",
    transition: theme.transitions.create(["background-color", "box-shadow"]),
    cursor: "default",
    outline: 0,
    textDecoration: "none",
    border: "none",
    padding: 0,
    verticalAlign: "middle",
    margin: theme.spacing(1),
    boxSizing: "border-box"
  },
  labelSpan: {
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12,
    userSelect: "none",
    whiteSpace: "nowrap",
    cursor: "inherit",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  chip: {
    borderRadius: "4px",
    backgroundColor: "rgba(0, 0, 0,0)",
    border: "1px solid rgba(0, 0, 0, 1)",
    width: "fit-content"
  },
  hover: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, .33)"
    }
  },
  test: {
    "& span": {
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  },

  isSelected: {
    backgroundColor: `${theme.palette.secondary.light} !important`
  }
}));

const EditDeleteField: React.FC<Props> = ({
  label,
  onClick,
  selected,
  children,
  id
}) => {
  const [evilHover, setEvilHover] = useState(false);
  const props = { color: "default", size: "small", onClick } as IconButtonProps;
  const { labelSpan, isSelected } = useStyles();

  const evilProps = {
    onMouseEnter: () => setEvilHover(true),
    onMouseLeave: () => setEvilHover(false)
  };

  return (
    <ItemSquareStyleWrapper
      hover={true}
      selectedStyle={evilHover ? isSelected : undefined}
    >
      <Tooltip title="Edit" placement="top">
        <span className={labelSpan}>{children}</span>
      </Tooltip>
      <IconButton {...props} {...evilProps} data-id={id}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </ItemSquareStyleWrapper>
  );
};

export default UserTimeRoleSelector;
