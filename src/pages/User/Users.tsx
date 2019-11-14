import React, { useState } from "react";
import { Query, Mutation } from "react-apollo";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import RootRef from "@material-ui/core/RootRef";

import Edit from "@material-ui/icons/Edit";
import LockIcon from "@material-ui/icons/Lock";
import Delete from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";

import PermissionsSelector from "../../components/PermissionsSelector";
import ResetPassUser from "./ResetPassUser";
import UpdateUser from "./UpdateUser";
import SelectViaQuery from "../../components/SelectViaQuery";
import CreateUser from "./CreateUser";

import { GET_USERS } from "../../gql/queries/userQuery";
import { GET_TIMEROLES } from "../../gql/queries/timeRoleQuery";
import {
  DELETE_USER,
  UPDATE_USER_PERMISSIONS,
  UPDATE_USER_TIMEROLES
} from "../../gql/mutations/userMut";
import PaperWrapper from "../../components/PaperWrapper";
import getInnerText from "../../helpers/getInnerText";

import useHighlightScrollandSreen from "../../helpers/hooks/useHighlightScrollandSreen";
import { Theme } from "@material-ui/core";
import { RouteComponentProps } from "react-router";
import UserTableWrapper from "./UserTableWrapper";
import NewUserPage from "./NewUserPage";

const useStyles = makeStyles((theme: Theme) => ({
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  shiftleft: {
    marginLeft: "-8px"
  },
  sideList: {
    flexGrow: 8,
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row"
  },
  highlight: {
    backgroundColor: theme.palette.primary.light
  },
  fadehighlight: {
    borderRadius: theme.spacing(1),
    transition: theme.transitions.create("background-color", {
      duration: "500ms"
    })
  }
}));

interface IProps extends RouteComponentProps {}

const Users: React.FC<IProps> = props => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [userScreen, setUserScreen] = useState("CREATE");
  const [screen, setScreen] = useState("General");
  const classes = useStyles();

  const [id, newRef] = useHighlightScrollandSreen(props.location, setScreen);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>, user?: any) => {
    if (user) setUserScreen(getInnerText(e.target));
    if (!user && screen === "Timecards") setUserScreen("CREATE_TIMEMODEL");
    setFormData(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(function() {
      setFormData({});
      setUserScreen("CREATE");
    }, 200);
  };

  function handleChange(newScreen: string) {
    setScreen(newScreen);
  }

  const content = (user: any) => {
    switch (screen) {
      default: {
        return (
          <ListItemSecondaryAction>
            <Button size="small" onClick={e => handleOpen(e, user)}>
              Edit
              <Edit fontSize="small" className={classes.rightIcon} />
            </Button>
            <Button size="small" onClick={e => handleOpen(e, user)}>
              Reset Password
              <LockIcon fontSize="small" className={classes.rightIcon} />
            </Button>
            <Button size="small" onClick={e => handleOpen(e, user)}>
              Delete
              <Delete fontSize="small" className={classes.rightIcon} />
            </Button>
          </ListItemSecondaryAction>
        );
      }
      case "Permissions": {
        const { id } = user;
        return (
          <Mutation
            mutation={UPDATE_USER_PERMISSIONS}
            refetchQueries={[{ query: GET_USERS }]}
          >
            {(
              fnc: (arg0: {
                variables: { id: string; permissions: string };
              }) => void
            ) => (
              <div className={classes.sideList}>
                <PermissionsSelector
                  startedPerms={user.permissions}
                  chipstyle={{ margin: "4px 8px" }}
                  onChange={(permissions: any) =>
                    fnc({ variables: { id, permissions } })
                  }
                />
              </div>
            )}
          </Mutation>
        );
      }
      case "Time Roles": {
        const { id } = user;
        return (
          <Mutation
            mutation={UPDATE_USER_TIMEROLES}
            refetchQueries={[{ query: GET_USERS }, { query: GET_TIMEROLES }]}
          >
            {(
              update: (arg0: {
                variables: { id: string; timeID: string };
              }) => void
            ) => (
              <SelectViaQuery
                startSelected={user.timeRoles}
                query={GET_TIMEROLES}
                name="timeRoles"
                selectedName="shortName"
                pusher={props.history.push}
                target={"/Admin/TimeRoles"}
                onChange={(timeRole: any) =>
                  update({
                    variables: {
                      id,
                      timeID: timeRole.map((timeRole: { id: any }) => {
                        return { id: timeRole.id };
                      })
                    }
                  })
                }
              />
            )}
          </Mutation>
        );
      }
    }
  };

  return (
    <>
      <PaperWrapper
        size={8}
        menu
        title="Users"
        menuOptions={["General", "Permissions", "Time Roles"]}
        menuCurrent={screen}
        menuChange={handleChange}
      >
        <Query query={GET_USERS}>
          {({ data = {} }: any) => {
            const { users } = data;
            return (
              <List>
                {users &&
                  users.map((user: any, i: number) => (
                    <React.Fragment key={user.id}>
                      <ListItem
                        className={[
                          classes.fadehighlight,
                          id === user.id ? classes.highlight : null
                        ].join(" ")}
                      >
                        {id === user.id ? (
                          <RootRef rootRef={newRef}>
                            <ListItemText
                              primary={`${user.firstName} ${user.lastName} `}
                              secondary={user.title}
                              style={{ flex: "1 0 auto" }}
                            />
                          </RootRef>
                        ) : (
                          <ListItemText
                            primary={`${user.firstName} ${user.lastName} `}
                            secondary={user.title}
                            style={{ flex: "1 0 auto" }}
                          />
                        )}
                        {content(user)}
                      </ListItem>
                      {i === users.length - 1 && screen !== "Permissions" && (
                        <ListItem key="button">
                          <Button
                            color="primary"
                            variant="outlined"
                            className={classes.shiftleft}
                            onClick={handleOpen}
                          >
                            Create New{" "}
                            {screen === "Timecards" ? "Time Model" : "User"}
                          </Button>
                        </ListItem>
                      )}
                    </React.Fragment>
                  ))}
              </List>
            );
          }}
        </Query>
      </PaperWrapper>

      <UserHandler
        handleClose={handleClose}
        open={open}
        user={formData}
        userScreen={userScreen}
      />
      <NewUserPage />
    </>
  );
};

interface IUserHandler {
  open: boolean;
  handleClose: () => void;
  user: any;
  userScreen: string;
}

const UserHandler: React.FC<IUserHandler> = ({
  open,
  handleClose,
  user,
  userScreen
}) => {
  let submitForm: (() => void) | null = null;
  const newSubmitForm = () => {
    if (submitForm) submitForm();
  };
  const formHandle = (newSubmit: () => void) => {
    submitForm = newSubmit;
  };

  const title = () => {
    switch (userScreen) {
      default: {
        return "Create User";
      }
      case "EDIT": {
        return "Edit User";
      }
      case "RESET PASSWORD": {
        return "Change User Password";
      }
      case "DELETE": {
        return `Delete ${user.firstName} ${user.lastName}`;
      }
      case "CREATE_TIMEMODEL": {
        return "Create New Timecard Model";
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
              return <>`You sure you want to Delete ${user.firstName}?!?`</>;
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
      <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }}>
        {title()}
      </DialogTitle>
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

export default Users;
