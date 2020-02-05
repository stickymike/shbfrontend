import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import OverlineMenu from "./OverlineMenu";
import FilterListIcon from "@material-ui/icons/FilterList";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import MyDivider from "./MyDivider";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  "@keyframes myspin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" }
  },

  root: {
    flexGrow: 1
  },
  header: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: "36px"
    // lineHeight: "unset"
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
    padding: "6px",
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  },
  container: {
    display: "flex",
    marginBottom: theme.spacing(2),
    alignItems: "center"
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

export interface IPaperProps {
  title: string;
  size?: any;
  actionIcons?: {
    icon: (props: SvgIconProps) => JSX.Element;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    iClass?: string;
  }[];
}

const NewPaper: React.FC<IPaperProps> = ({
  children,
  title,
  size = 5,
  actionIcons = []
}) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={size}>
        <Paper className={classes.paperStyles} elevation={0}>
          <Box className={classes.container}>
            <Typography variant="body2" className={classes.header}>
              {title}
            </Typography>
            <div className={classes.grow} />
            {actionIcons.map(({ icon: Icon, onClick, iClass }, i) => (
              <IconButton
                key={`IButton-${i}`}
                className={[
                  classes.actionButton,
                  iClass
                  // spinnerLoading ? classes.spin : null
                ].join(" ")}
                onClick={onClick}
              >
                <Icon />
              </IconButton>
            ))}
          </Box>
          {/* <MyDivider /> */}
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NewPaper;
// export { IPaperProps };
