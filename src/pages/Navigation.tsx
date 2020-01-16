import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { withRouter, RouteComponentProps } from "react-router";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

import SettingsIcon from "@material-ui/icons/Settings";
import TimelapseIcon from "@material-ui/icons/Timelapse";

import { ReactComponent as SHBName } from "../SHBName.svg";
import Me from "../components/Me";
import { GET_ME, NEW_GET_ME } from "../gql/queries/userQuery";
import { PermHelper } from "../helpers/permhelper";
import getAttribute from "../helpers/getAttribute";
import { Divider, Theme } from "@material-ui/core";

//TODO Anys mucho

const LOG_OUT = gql`
  mutation SignOut {
    signout
  }
`;

const appBarStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1)
  },
  shbIcon: {
    "&:hover": { cursor: "pointer" },
    minWidth: "8rem",
    height: "3rem"
  },
  icon: {
    fontSize: "30px"
  },
  avatar: {
    color: "#f5f5f5",
    backgroundColor: theme.palette.primary.main,
    height: "30px",
    width: "30px",
    fontSize: "1rem",
    fontWeight: 500
  },
  iconButton: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  smaller: {
    height: "16px"
  },
  myAppBar: {
    zIndex: 15,
    backgroundColor: "transparent"
  },
  movedAppBar: {
    backgroundColor: "#fafafa",
    borderBottom: "1px solid rgba(0, 0, 0, 1)"
  },
  arrow: {
    position: "absolute",
    fontSize: 16,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 1,
      height: 1,
      borderStyle: "solid"
    }
  },
  popper: {
    zIndex: 1
  },
  hidePopper: {
    transform: "translateX(-200px)"
  },
  menuTop: {
    "&:hover": { backgroundColor: "inherit", cursor: "default" }
  },
  menuItems: {
    fontSize: ".875rem",
    lineHeight: "1rem",
    justifyContent: "flex-end"
  }
}));

const Navigation: React.FC<RouteComponentProps> = props => {
  const [elevation, setElevation] = useState(false);
  const classes = appBarStyles();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    if (window.scrollY > 30) setElevation(true);
    else setElevation(false);
  };

  function linkClick(e: React.MouseEvent<HTMLButtonElement>) {
    props.history.push(`/${getAttribute(e.target, "data-link")}`);
  }
  return (
    <>
      <div className={classes.root}>
        <AppBar
          color="default"
          elevation={0}
          position="fixed"
          className={[
            classes.myAppBar,
            elevation ? classes.movedAppBar : null
          ].join(" ")}
        >
          <Toolbar>
            <SHBName
              data-link="Home"
              onClick={() => props.history.push("/Home")}
              className={classes.shbIcon}
            />
            <div className={classes.grow} />
            <div>
              <Me>
                {({ me }: any) => {
                  if (me)
                    return (
                      <LoggedInMenu me={me} linkClick={linkClick} {...props} />
                    );
                  return <NotLoggedInMenu linkClick={linkClick} {...props} />;
                }}
              </Me>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

interface INotLoggedInMenu {
  location: any;
  linkClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
type Button = {
  link: string;
};

const NotLoggedInMenu: React.FC<INotLoggedInMenu> = ({
  location,
  linkClick
}) => {
  const classes = appBarStyles();
  const thisLocation = location.pathname.replace("/", "");
  return (
    <>
      <Button
        variant="outlined"
        color={thisLocation === "Timeclock" ? "primary" : "default"}
        className={classes.button}
        data-link="Timeclock"
        onClick={linkClick}
      >
        Timeclock
      </Button>
      <Button
        variant="outlined"
        color={thisLocation === "Login" ? "primary" : "default"}
        className={classes.button}
        data-link="Login"
        onClick={linkClick}
      >
        Log In
      </Button>
    </>
  );
};

function findElement(
  e: any,
  wantedElement = "BUTTON",
  topElement = "BUTTON"
): HTMLElement {
  if (e.nodeName === wantedElement) return e;
  if (e.nodeName === topElement)
    return findElement(e.childNodes[0], wantedElement, topElement);
  return findElement(e.parentNode, wantedElement, topElement);
}

interface ILoggedInMenu {
  me: any;
  linkClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LoggedInMenu: React.FC<ILoggedInMenu> = ({ me, linkClick }) => {
  const classes = appBarStyles();
  const [open, setOpen] = React.useState(false);

  const anchorEl = React.useRef<HTMLElement | undefined>(undefined);

  const UserMenu = [
    {
      node: (
        <div key="header">
          <MenuItem className={[classes.menuItems, classes.menuTop].join(" ")}>
            {`${me.firstName} ${me.lastName}`}
            <Avatar className={classes.avatar} style={{ marginLeft: "8px" }}>
              {me.firstName[0]}
              {me.lastName[0]}
            </Avatar>
          </MenuItem>
          <Divider />
        </div>
      )
    },
    {
      node: (
        <Mutation
          key="Logout"
          mutation={LOG_OUT}
          refetchQueries={[{ query: GET_ME }, { query: NEW_GET_ME }]}
        >
          {(fnc: (e: any) => Promise<any>) => (
            <MenuItem onClick={fnc} className={classes.menuItems}>
              Log Out
            </MenuItem>
          )}
        </Mutation>
      )
    },
    {
      node: (
        <MenuItem
          key="home"
          data-link="Home"
          onClick={wrappedLinkClick}
          className={classes.menuItems}
        >
          User Profile
        </MenuItem>
      )
    }
  ];

  const [displayMenu, setdisplayMenu] = React.useState(UserMenu);

  const TimeClockMenu = [
    {
      node: (
        <div key="header">
          <MenuItem className={[classes.menuItems, classes.menuTop].join(" ")}>
            Timecards
            <TimelapseIcon
              className={classes.icon}
              style={{ marginLeft: "8px" }}
            />
          </MenuItem>
          <Divider />
        </div>
      )
    },
    {
      node: (
        <MenuItem
          key="timeclock"
          data-link="Timeclock"
          onClick={wrappedLinkClick}
          className={classes.menuItems}
        >
          Quick Punch
        </MenuItem>
      )
    },
    {
      node: (
        <MenuItem
          key="timereport"
          data-link="TimeReport"
          onClick={wrappedLinkClick}
          className={classes.menuItems}
        >
          Time Report
        </MenuItem>
      )
    },
    {
      node: (
        <MenuItem
          key="timerequest"
          data-link="TimeRequest"
          onClick={wrappedLinkClick}
          className={classes.menuItems}
        >
          Time Request
        </MenuItem>
      )
    }
  ];
  const AdminMenu = [
    {
      node: (
        <div key="header">
          <MenuItem
            key="header"
            className={[classes.menuItems, classes.menuTop].join(" ")}
          >
            Admin
            <SettingsIcon
              className={classes.icon}
              style={{ marginLeft: "8px" }}
            />
          </MenuItem>
          <Divider />
        </div>
      )
    },
    {
      node: (
        <MenuItem
          key="Admin"
          data-link="Admin/Users"
          onClick={wrappedLinkClick}
          className={classes.menuItems}
        >
          Users
        </MenuItem>
      )
    },
    {
      node: (
        <MenuItem
          key="TimeOptions"
          data-link="Admin/TimeRoles"
          onClick={wrappedLinkClick}
          className={classes.menuItems}
        >
          Time Roles
        </MenuItem>
      )
    },
    {
      node: (
        <MenuItem
          key="timeclocklist"
          data-link="Admin/TimeCards"
          onClick={wrappedLinkClick}
          className={classes.menuItems}
        >
          Time Cards
        </MenuItem>
      )
    }
  ];

  function wrappedLinkClick(e: React.MouseEvent<any>) {
    handleClose();
    linkClick(e);
  }

  const menuClick = (
    e: React.MouseEvent<HTMLLIElement | HTMLButtonElement>
  ) => {
    anchorEl.current = e.currentTarget
      ? findElement(e.currentTarget, "SPAN", "BUTTON")
      : undefined;
    const menu = findElement(anchorEl.current).getAttribute("data-link");
    switch (menu) {
      default:
        setdisplayMenu(AdminMenu);
        break;
      case "TimeClock":
        setdisplayMenu(TimeClockMenu);
        break;
      case "User":
        setdisplayMenu(UserMenu);
        break;
    }

    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
    anchorEl.current = undefined;
  }
  return (
    <>
      <PermHelper includes={"ADMIN"}>
        <IconButton
          color="inherit"
          className={classes.iconButton}
          onClick={menuClick}
          data-link="Admin"
        >
          <SettingsIcon className={classes.icon} />
        </IconButton>
      </PermHelper>
      <IconButton
        color="inherit"
        className={classes.iconButton}
        data-link="TimeClock"
        onClick={menuClick}
      >
        <TimelapseIcon className={classes.icon} />
      </IconButton>

      <IconButton
        color="inherit"
        className={classes.iconButton}
        onClick={menuClick}
        data-link="User"
      >
        <Avatar className={classes.avatar}>
          {me.firstName[0]}
          {me.lastName[0]}
        </Avatar>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorEl.current}
        transition
        disablePortal
        placement="bottom-end"
        className={[classes.popper, open ? null : classes.hidePopper].join(" ")}
      >
        {(payload: any) => {
          return (
            <Fade
              {...payload.TransitionProps}
              id="menu-list-grow"
              style={{
                transform: "translateY(-38px) translateX(16px)",
                transformOrigin:
                  payload.placement === "bottom right"
                    ? "center top"
                    : "center bottom"
              }}
            >
              <Paper elevation={2}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList style={{ paddingTop: 0 }}>
                    {displayMenu.map((menu, id) => menu.node)}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Fade>
          );
        }}
      </Popper>
    </>
  );
};

export default withRouter(Navigation);
