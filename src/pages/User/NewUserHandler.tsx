import React from "react";
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

import UserOptionsMenu from "./UserOptionsMenu";
import useSubmitPassBack from "../../helpers/hooks/useSubmitPassBack";
import UserPermissionSelector from "./UserPermissionSelector";
import UserTimeRoleSelector from "./UserTimeRoleSelector";
import useMenuProps from "../../components/Menu/useMenuProps";

interface IUserHandler {
  open: boolean;
  handleClose: () => void;
  changeScreen: (a: string) => void;
  user: any;
  userScreen: string;
}

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
  const [handleClick, userMenuProps] = useMenuProps(
    menuItems.filter(menu => menu.location !== userScreen),
    changeScreen
  );
  const content = () => {
    const actionProps = { formHandle, handleClose, user };
    switch (userScreen) {
      default: {
        return <CreateUser {...actionProps} />;
      }
      case "EDIT": {
        return <UpdateUser {...actionProps} />;
      }
      case "RESET PASSWORD": {
        return <ResetPassUser {...actionProps} />;
      }
      case "ALLPERMISSIONS": {
        return <UserPermissionSelector {...actionProps} />;
      }
      case "ALLTIMEROLES": {
        return <UserTimeRoleSelector {...actionProps} />;
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
  return (
    <Dialog open={open} onClose={handleClose} style={{ top: "-30%" }}>
      <div style={{ display: "flex" }}>
        <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }}>
          {title(userScreen, user)}
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
        <UserOptionsMenu {...userMenuProps} />
      </div>
      <DialogContent>{content()}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={newSubmitForm} color="primary">
          {button(userScreen)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const button = (userScreen: string) => {
  switch (userScreen) {
    default: {
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

const title = (userScreen: string, user: any) => {
  switch (userScreen) {
    default: {
      return "Create New User";
    }
    case "ALLPERMISSIONS": {
      return `Change ${user.firstName}'s Permissions`;
    }
    case "EDIT": {
      return `Edit ${user.firstName} ${user.lastName}`;
    }
    case "ALLTIMEROLES": {
      return `Change ${user.firstName}'s Time Roles`;
    }
    case "RESET PASSWORD": {
      return `Change ${user.firstName}'s Password`;
    }
    case "DELETE": {
      return `Delete ${user.firstName} ${user.lastName}`;
    }
  }
};

export default NewUserHandler;
