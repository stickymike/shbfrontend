import React from "react";
import { makeStyles } from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(() => ({
  divider: {
    clear: "both",
    margin: ".5rem 0rem 1rem 0rem",
    backgroundColor: "rgba(0, 0, 0, 0.33)"
  }
}));

interface IProps {}

const MyDivider: React.FC<IProps> = () => {
  const classes = useStyles();
  return <Divider className={classes.divider} />;
};

export default MyDivider;
