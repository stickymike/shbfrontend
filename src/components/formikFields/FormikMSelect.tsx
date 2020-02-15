import React from "react";

import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Theme } from "@material-ui/core";
import { useField } from "formik";

const useStyles = makeStyles((theme: Theme) => ({
  smallpadding: {
    padding: "8px",
    fontSize: ".8em",
    fontStyle: "italic"
  },
  bkColor: {
    "& input": {
      backgroundColor: theme.palette.primary.light,
      borderRadius: "4px"
    }
  },
  selected: {
    backgroundColor: theme.palette.action.selected,
    fontWeight: theme.typography.fontWeightMedium
  },
  label: {
    color: theme.palette.primary.main
  },
  textArea: {
    "&:after": {
      transform: "scaleX(1)"
    }
  }
}));

const ITEM_HEIGHT = 48;

interface Props {
  label: string;
  name: string;
  selectFrom: any;
  highlighting?: boolean;
  // selected: string[];
}
const FormikMSelector: React.FC<Props> = ({
  label,
  selectFrom,
  name,
  highlighting
}) => {
  // const { setParams: setQParams } = useCtx();
  // const [userIds, setUserIds] = React.useState<string[]>([]);
  const [{ value: userIds, ...field }, , { setValue: setUserIds }] = useField(
    name
  );

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);

  function filterValue(userIds: string[], source: string) {
    if (userIds.length === 0) return `All ${source}s Selected`;
    else {
      return userIds
        .map(id => {
          const { firstName, lastName } = selectFrom[
            selectFrom.map(({ id }: any) => id).indexOf(id)
          ];
          return `${firstName} ${lastName}`;
        })
        .join(", ");
    }
  }
  function handleClose() {
    setAnchorEl(null);
  }

  function handleMenuClick(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const userID = event.currentTarget.getAttribute("id");
    const middlearray = userIds;
    if (userID && userIds.includes(userID)) {
      const newarray = middlearray.filter((id: any) => id !== userID);
      setUserIds(newarray);
    } else if (userID) {
      middlearray.push(userID);
      setUserIds(middlearray);
    }
    // handleClose();
  }
  function clearIDs() {
    setUserIds([]);
    handleClose();
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setAnchorEl(event.currentTarget);
  }

  const Users = highlighting && userIds.length !== 0;

  return (
    <>
      <TextField
        {...field}
        onChange={undefined}
        multiline
        rows={1}
        rowsMax={20}
        fullWidth
        helperText=" "
        label={label}
        value={filterValue(userIds, "User")}
        InputLabelProps={Users ? { className: classes.label } : undefined}
        onClick={handleClick}
        InputProps={Users ? { className: classes.textArea } : undefined}
      />
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}
      >
        {selectFrom?.map((user: any) => (
          <MenuItem
            key={user.id}
            onClick={handleMenuClick}
            id={user.id}
            className={userIds.includes(user.id) ? classes.selected : undefined}
          >
            {user.firstName}
          </MenuItem>
        ))}
        <MenuItem
          onClick={clearIDs}
          className={userIds.length === 0 ? classes.selected : undefined}
        >
          All Users
        </MenuItem>
      </Menu>
    </>
  );
};

export default FormikMSelector;
