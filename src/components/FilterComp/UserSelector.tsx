import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";

import Menu from "@material-ui/core/Menu";

import MenuItem from "@material-ui/core/MenuItem";
import { Query } from "@apollo/react-components";

import { GET_USERS } from "../../gql/queries/userQuery";
import { Theme } from "@material-ui/core";
import { useCtx } from "./NewFilterHeader";

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
  }
}));

const ITEM_HEIGHT = 48;

interface IUser {
  id: string;
  firstName: string;
}

const UserSelector: React.FC<any> = () => {
  const { setParams: setQParams } = useCtx();
  const [userIds, setUserIds] = React.useState<string[]>([]);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);

  function filterValue(userIds: string[], source: string) {
    if (userIds.length === 0) return `All ${source}s Selected`;
    if (userIds.length === 1) return `One ${source} Selected`;
    if (userIds.length === 2) return `Two ${source}s Selected`;
    if (userIds.length === 3) return `Three ${source}s Selected`;
    if (userIds.length < 3) return `Mutliple ${source}s Selected`;
  }
  function handleClose() {
    setAnchorEl(null);
  }

  function handleMenuClick(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const userID = event.currentTarget.getAttribute("id");
    const middlearray = userIds;
    if (userID && userIds.includes(userID)) {
      const newarray = middlearray.filter(id => id !== userID);
      setUserIds(newarray);
    } else if (userID) {
      middlearray.push(userID);
      setUserIds(middlearray);
    }
    handleClose();
  }
  function clearIDs() {
    setUserIds([]);
    handleClose();
  }

  useEffect(() => {
    setQParams((params: any) => ({ ...params, userIds }));
  }, [setQParams, userIds, userIds.length]);

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setAnchorEl(event.currentTarget);
  }

  return (
    <Query query={GET_USERS}>
      {({ data = {} }: any) => {
        const { users } = data;
        return (
          <>
            <TextField
              variant="outlined"
              placeholder="Users"
              value={filterValue(userIds, "User")}
              className={userIds.length > 0 ? classes.bkColor : undefined}
              margin="normal"
              onClick={handleClick}
              style={{ margin: 0 }}
              inputProps={{
                className: classes.smallpadding
              }}
            />
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200
                }
              }}
            >
              {users &&
                users.map((user: any) => (
                  <MenuItem
                    key={user.id}
                    onClick={handleMenuClick}
                    id={user.id}
                    className={
                      userIds.includes(user.id) ? classes.selected : undefined
                    }
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
      }}
    </Query>
  );
};

export default UserSelector;
