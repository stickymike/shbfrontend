import React, { useState } from "react";
import UpdateUser from "./UpdateUser";
import CreateUser from "./CreateUser";
import ResetPassUser from "./ResetPassUser";
import { Mutation } from "react-apollo";
import { DELETE_USER } from "../../gql/mutations/userMut";
import { GET_USERS } from "../../gql/queries/userQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import MoreVert from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";

import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { Popover, Grow } from "@material-ui/core";

interface IUserHandler {
  open: boolean;
  handleClose: () => void;
  changeScreen: (a: string) => void;
  user: any;
  userScreen: string;
}

const useSubmitPassBack = () => {
  let submitForm: (() => void) | null = null;
  const newSubmitForm = () => {
    if (submitForm) submitForm();
  };
  const formHandle = (newSubmit: () => void) => {
    submitForm = newSubmit;
  };
  return [newSubmitForm, formHandle] as const;
};

const useMenu = (
  options: {
    display: string;
    location: string;
    color: "primary" | "secondary";
  }[],
  changeScreen: (a: string) => void
) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (arg: string | null) => (
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (arg) changeScreen(arg);
    setAnchorEl(null);
  };

  const myMenu = () => (
    <Popover
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      getContentAnchorEl={null}
      anchorEl={anchorEl}
      keepMounted={true}
      open={open}
      onClose={handleClose(null)}
      PaperProps={{
        elevation: 2,
        style: {
          display: "flex",
          flexDirection: "column"
        }
      }}
    >
      {options.map(option => (
        <Button
          color={option.color}
          key={option.location}
          onClick={handleClose(option.location)}
          style={{ margin: "8px" }}
        >
          {option.display}
        </Button>
      ))}
    </Popover>
  );
  return [handleClick, myMenu] as const;
};

const createMenu = (
  display: string,
  location: string,
  color: "primary" | "secondary"
) => {
  return { display, location, color };
};

const menuItems = [
  createMenu("Edit User", "EDIT", "primary"),
  createMenu("Reset Password", "RESET PASSWORD", "secondary"),
  createMenu("Delete User", "DELETE", "secondary")
];

const NewUserHandler: React.FC<IUserHandler> = ({
  open,
  handleClose,
  user,
  userScreen,
  changeScreen
}) => {
  const [newSubmitForm, formHandle] = useSubmitPassBack();
  const [handleClick, Menu] = useMenu(
    menuItems.filter(menu => menu.location !== userScreen),
    changeScreen
  );

  const title = () => {
    switch (userScreen) {
      default: {
        return "Create New User";
      }
      case "EDIT": {
        return `Edit ${user.firstName} ${user.lastName}`;
      }
      case "RESET PASSWORD": {
        return `Change ${user.firstName}'s Password`;
      }
      case "DELETE": {
        return `Delete ${user.firstName} ${user.lastName}`;
      }
    }
  };

  const content = () => {
    switch (userScreen) {
      default: {
        return (
          <CreateUser
            formHandle={formHandle}
            handleClose={handleClose}
            user={user}
          />
        );
      }
      case "EDIT": {
        return (
          <UpdateUser
            user={user}
            formHandle={formHandle}
            handleClose={handleClose}
          />
        );
      }
      case "RESET PASSWORD": {
        return (
          <ResetPassUser
            user={user}
            formHandle={formHandle}
            handleClose={handleClose}
          />
        );
      }
      case "DELETE": {
        return (
          <Mutation
            mutation={DELETE_USER}
            variables={{ id: user.id }}
            refetchQueries={[{ query: GET_USERS }]}
            onCompleted={handleClose}
          >
            {(fnc: () => void) => {
              formHandle(fnc);
              return <>{`You sure you want to Delete ${user.firstName}?!?`}</>;
            }}
          </Mutation>
        );
      }
    }
  };
  const button = () => {
    switch (userScreen) {
      default: {
        return "Create";
      }
      case "EDIT": {
        return "Update";
      }
      case "RESET PASSWORD": {
        return "Update";
      }
      case "DELETE": {
        return "Delete";
      }
      case "CREATE_TIMEMODEL": {
        return "Create";
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{ top: "-30%" }}
    >
      <div style={{ display: "flex" }}>
        <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }}>
          {title()}
        </DialogTitle>
        <div style={{ flexGrow: 1 }} />

        {user && (
          <IconButton
            size="small"
            color="default"
            onClick={handleClick}
            style={{ margin: "16px 24px" }}
          >
            <MoreVert />
          </IconButton>
        )}
        <Menu />
      </div>
      <DialogContent>{content()}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={newSubmitForm} color="primary">
          {button()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewUserHandler;
