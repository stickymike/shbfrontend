import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  squareDiv: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(13),
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    // color: theme.palette.getContrastText(backgroundColor),
    // backgroundColor: backgroundColor,
    borderRadius: 32 / 2,
    whiteSpace: "nowrap",
    transition: theme.transitions.create(["background-color", "box-shadow"]),
    cursor: "default",
    outline: 0,
    textDecoration: "none",
    border: "none",
    padding: 0,
    verticalAlign: "middle",
    margin: theme.spacing(1),
    boxSizing: "border-box",
    overflow: "hidden",
    maxWidth: "fit-content"
  },
  hover: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.light
    }
  },
  chip: {
    borderRadius: "4px",
    backgroundColor: "rgba(0, 0, 0,0)",
    border: "1px solid rgba(0, 0, 0, 1)"
  }
}));

interface Props {
  selectedStyle?: string;
  hover?: boolean;
}

const ItemSquareStyleWrapper: React.FC<Props> = ({
  selectedStyle,
  hover,
  children
}) => {
  const { squareDiv, chip, hover: hoverStyle } = useStyles();
  return (
    <div
      className={[
        squareDiv,
        chip,
        selectedStyle,
        hover ? hoverStyle : null
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default ItemSquareStyleWrapper;
