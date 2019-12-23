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
import Delete from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";

import CreateTimeRole from "./CreateTimeRole";
import UpdateTimeRole from "./UpdateTimeRole";
import SelectViaQuery from "../../components/SelectViaQuery";

import {
  DELETE_TIMEROLE,
  UPDATE_TIMEROLE_USERS
} from "../../gql/mutations/timeRoleMut";

import { GET_TIMEROLES } from "../../gql/queries/timeRoleQuery";

import { GET_USERS } from "../../gql/queries/userQuery";

import PaperWrapper from "../../components/PaperWrapper";
import getInnerText from "../../helpers/getInnerText";
import { Avatar, Tooltip, Theme } from "@material-ui/core";

import useHighlightScrollandSreen from "../../helpers/hooks/useHighlightScrollandSreen";
import { RouteChildrenProps } from "react-router";
import TimeRolePage from "./TimeRolePage";

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
  avatar: {
    color: "#f5f5f5",
    backgroundColor: theme.palette.primary.main,
    height: "25px",
    width: "25px",
    fontSize: ".75rem",
    fontWeight: 500,
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1) / 2
  },
  DivAvatar: {
    display: "flex",
    alignSelf: "flex-start"
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

const TimeRoles: React.FC<RouteChildrenProps> = props => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [userScreen, setUserScreen] = React.useState("CREATE");
  const [screen, setScreen] = React.useState("Edit");
  const [id, ref] = useHighlightScrollandSreen(props.location, setScreen);

  const classes = useStyles();

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

  const content = (timeRole: any) => {
    switch (screen) {
      default: {
        return (
          <>
            <div className={classes.DivAvatar}>
              {timeRole.users.map((user: any) => (
                <Tooltip
                  title={`${user.firstName} ${user.lastName}`}
                  key={user.id}
                >
                  <Avatar className={classes.avatar} key={user.id}>
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </Avatar>
                </Tooltip>
              ))}
            </div>
            <ListItemSecondaryAction>
              <Button size="small" onClick={e => handleOpen(e, timeRole)}>
                Edit
                <Edit fontSize="small" className={classes.rightIcon} />
              </Button>

              <Button size="small" onClick={e => handleOpen(e, timeRole)}>
                Delete
                <Delete fontSize="small" className={classes.rightIcon} />
              </Button>
            </ListItemSecondaryAction>
          </>
        );
      }
      case "Assign": {
        const { id } = timeRole;
        return (
          <Mutation
            mutation={UPDATE_TIMEROLE_USERS}
            refetchQueries={[{ query: GET_USERS }, { query: GET_TIMEROLES }]}
          >
            {(
              update: (arg0: { variables: { id: any; userID: any } }) => void
            ) => (
              <>
                <div style={{ flexGrow: 1 }} />
                <SelectViaQuery
                  startSelected={timeRole.users}
                  query={GET_USERS}
                  name="users"
                  selectedName="firstName"
                  pusher={props.history.push}
                  target={"/Admin/Users"}
                  onChange={(timeRole: any) =>
                    update({
                      variables: {
                        id,
                        userID: timeRole.map((timeRole: any) => {
                          return { id: timeRole.id };
                        })
                      }
                    })
                  }
                />
              </>
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
        title="Time Roles"
        menuOptions={["Edit", "Assign"]}
        menuCurrent={screen}
        menuChange={handleChange}
      >
        <Query query={GET_TIMEROLES}>
          {({ data: { timeRoles } = {} }: { data: any }) => (
            <List>
              {timeRoles &&
                timeRoles.map((timeRole: any, i: number) => {
                  return (
                    <React.Fragment key={timeRole.id}>
                      <ListItem
                        className={[
                          classes.fadehighlight,
                          id === timeRole.id ? classes.highlight : null
                        ].join(" ")}
                      >
                        {id === timeRole.id ? (
                          <RootRef rootRef={ref}>
                            <ListItemText
                              primary={timeRole.shortName}
                              secondary={timeRole.description}
                              style={{ flex: "0 auto" }}
                            />
                          </RootRef>
                        ) : (
                          <ListItemText
                            primary={timeRole.shortName}
                            secondary={timeRole.description}
                            style={{ flex: "0 auto" }}
                          />
                        )}

                        {content(timeRole)}
                      </ListItem>
                      {i === timeRoles.length - 1 && screen === "Edit" && (
                        <ListItem key="button">
                          <Button
                            color="primary"
                            variant="outlined"
                            className={classes.shiftleft}
                            onClick={handleOpen}
                          >
                            Create New Time Role
                          </Button>
                        </ListItem>
                      )}
                    </React.Fragment>
                  );
                })}
            </List>
          )}
        </Query>
      </PaperWrapper>

      <UserHandler
        handleClose={handleClose}
        open={open}
        user={formData}
        userScreen={userScreen}
      />

      <TimeRolePage />
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
  const [error, setError] = useState(false);

  let submitForm: (() => void) | null = null;
  const newSubmitForm = () => {
    if (submitForm) submitForm();
  };
  const formHandle = (newSubmit: () => void) => {
    submitForm = newSubmit;
  };

  // let submitForm = null;

  // const newSubmitForm = () => submitForm();

  // const formHandle = newSubmit => (submitForm = newSubmit);
  const wrappedHandleClose = () => {
    setError(false);
    handleClose();
  };

  const title = () => {
    switch (userScreen) {
      default: {
        return "Create User";
      }
      case "EDIT": {
        return "Edit User";
      }
      case "DELETE": {
        return `Delete ${user.name}`;
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
          <CreateTimeRole
            formHandle={formHandle}
            handleClose={wrappedHandleClose}
            timeRole={user}
          />
        );
      }
      case "EDIT": {
        return (
          <UpdateTimeRole
            formHandle={formHandle}
            handleClose={wrappedHandleClose}
            timeRole={user}
          />
        );
      }
      case "DELETE": {
        return (
          <div style={{ paddingTop: "24px" }}>
            <Mutation
              mutation={DELETE_TIMEROLE}
              variables={{ id: user.id }}
              refetchQueries={[{ query: GET_TIMEROLES }]}
              onCompleted={wrappedHandleClose}
              onError={() => setError(true)}
            >
              {(fnc: () => void, data: any) => {
                formHandle(fnc);
                if (data.error) return data.error.graphQLErrors[0].message;
                return `You sure you want to Delete ${user.shortName}?!?`;
              }}
            </Mutation>
          </div>
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
      case "PASSWORD": {
        return "Update";
      }
      case "DELETE": {
        if (error) return "Close";
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
      onClose={wrappedHandleClose}
      aria-labelledby="form-dialog-title"
      style={{ top: "-30%" }}
    >
      <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }}>
        {title()}
      </DialogTitle>
      <DialogContent style={{ color: error ? "Red" : undefined }}>
        {content()}
      </DialogContent>
      <DialogActions>
        <Button onClick={wrappedHandleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={error ? wrappedHandleClose : newSubmitForm}
          color="primary"
        >
          {button()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TimeRoles;
