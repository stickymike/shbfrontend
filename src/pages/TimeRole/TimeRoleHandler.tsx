import React from "react";

import { Mutation } from "react-apollo";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import MoreVert from "@material-ui/icons/MoreVert";

import useSubmitPassBack from "../../helpers/hooks/useSubmitPassBack";

import SimpleMenu from "../../components/Menu/SimpleMenu";
import useSimpleMenuProps from "../../components/Menu/useSimpleMenuProps";
import CreateTimeRole from "../../resources/TimeRoles/CreateTimeRole";
import UpdateTimeRole from "../../resources/TimeRoles/UpdateTimeRole";
import { GET_TIMEROLES } from "../../gql/queries/timeRoleQuery";
import { DELETE_TIMEROLE } from "../../gql/mutations/timeRoleMut";
import TimeRoleUserSelector from "./Fields/TimeRoleUserSelector";

interface IUserHandler {
  open: boolean;
  handleClose: () => void;
  changeScreen: (a: string) => void;
  timeRole: any;
  timeRoleScreen: string;
}

const createMenu = (
  display: string,
  location: string,
  color: "primary" | "secondary"
) => {
  return { display, location, color };
};

const menuItems = [
  createMenu("Edit Time Role", "EDIT", "primary"),
  createMenu("Delete Time Role", "DELETE", "secondary")
];

const TimeRoleHandler: React.FC<IUserHandler> = ({
  open,
  handleClose,
  timeRole,
  timeRoleScreen,
  changeScreen
}) => {
  const [newSubmitForm, formHandle] = useSubmitPassBack();
  const [handleClick, userMenuProps] = useSimpleMenuProps(
    menuItems
      .filter(menu => menu.location !== timeRoleScreen)
      .map((menu: any) => ({
        Component: Button,
        functionString: menu.location,
        componentProps: { color: menu.color, style: { margin: "8px" } },
        text: menu.display
      })),
    changeScreen
  );
  const content = () => {
    const actionProps = { formHandle, handleClose, timeRole };
    switch (timeRoleScreen) {
      default: {
        return <CreateTimeRole {...actionProps} />;
      }
      case "EDIT": {
        return <UpdateTimeRole {...actionProps} />;
      }
      case "ALLUSERS": {
        return <TimeRoleUserSelector {...actionProps} />;
      }

      case "DELETE": {
        return (
          <div style={{ paddingTop: "24px" }}>
            <Mutation
              mutation={DELETE_TIMEROLE}
              variables={{ id: timeRole.id }}
              refetchQueries={[{ query: GET_TIMEROLES }]}
              onCompleted={handleClose}
              // onError={() => setError(true)}
            >
              {(fnc: () => void, data: any) => {
                formHandle(fnc);
                if (data.error) return data.error.graphQLErrors[0].message;
                return `You sure you want to Delete ${timeRole.shortName}?!?`;
              }}
            </Mutation>
          </div>
        );
      }
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} style={{ top: "-30%" }}>
      <div style={{ display: "flex" }}>
        <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }}>
          {title(timeRoleScreen, timeRole)}
        </DialogTitle>
        <div style={{ flexGrow: 1 }} />
        {timeRole && (
          <IconButton
            size="small"
            color="default"
            onClick={handleClick}
            style={{ margin: "16px 24px" }}
          >
            <MoreVert />
          </IconButton>
        )}
        <SimpleMenu {...userMenuProps} />
      </div>
      <DialogContent>{content()}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={newSubmitForm} color="primary">
          {button(timeRoleScreen)}
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
    case "CREATE": {
      return "Create";
    }
  }
};

const title = (userScreen: string, timeRole: any) => {
  switch (userScreen) {
    default: {
      return "Create New Time Role";
    }
    case "EDIT": {
      return `Edit ${timeRole.shortName} Time Role`;
    }
    case "DELETE": {
      return `Delete ${timeRole.shortName} Time Role`;
    }
    case "ALLUSERS": {
      return `Edit ${timeRole.shortName} Role's Users`;
    }
  }
};

export default TimeRoleHandler;
