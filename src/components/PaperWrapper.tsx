import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import OverlineMenu from "./OverlineMenu";

import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import MyDivider from "./MyDivider";

const useStyles = makeStyles(() => ({
  "@keyframes myspin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" }
  },

  root: {
    flexGrow: 1
  },
  header: {
    float: "left"
  },
  paperStyles: {
    textAlign: "center",
    padding: "1rem",
    paddingTop: ".5rem",
    justifySelf: "center",
    alignSelf: "center",
    minWidth: "10rem",
    border: "1px solid rgba(0, 0, 0, 1)",
    margin: "10rem auto"
  },
  actionButton: {
    float: "right",
    padding: "7px",
    fontSize: ".75rem",
    "& svg": {
      height: ".75em",
      width: ".75em"
    }
  },
  container: {
    display: "flex"
  },
  grow: {
    flexGrow: 1
  },
  spin: {
    animationName: "$myspin",
    animationDuration: "1000ms",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear"
  }
}));

interface IProps {
  children: React.ReactNode;
  title: string;
  action?: boolean;
  actionIcon?: any;
  actionFnc?: any;
  menu?: boolean;
  menuCurrent?: string;
  menuOptions?: string[];
  menuChange?: Function;
  size?: any;
  spinnerLoading?: boolean;
  hookActionIcon?: any;
}

const PaperWrapper: React.FC<IProps> = ({
  children,
  title,
  action = false,
  actionIcon: Icon,
  actionFnc = () => null,
  menu,
  menuCurrent,
  menuOptions,
  menuChange = undefined,
  size = 5,
  spinnerLoading = false,
  hookActionIcon: HookIcon
}) => {
  //@ts-ignore
  const classes = useStyles();

  const noMenu = () => (
    <>
      <Typography variant="overline" className={classes.header}>
        {title}
      </Typography>
      <div className={classes.grow} />
      {action ? (
        <IconButton
          className={[
            classes.actionButton,
            spinnerLoading ? classes.spin : null
          ].join(" ")}
          onClick={actionFnc}
        >
          <Icon fontSize="small" />
        </IconButton>
      ) : HookIcon ? (
        <HookIcon />
      ) : null}
    </>
  );

  const Menu = () => (
    <OverlineMenu
      screenPage={title}
      selectedOption={menuCurrent}
      options={menuOptions}
      handleChange={menuChange}
    />
  );

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={size}>
        <Paper className={classes.paperStyles} elevation={0}>
          <Box className={classes.container}>{menu ? Menu() : noMenu()}</Box>
          <MyDivider />
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PaperWrapper;
