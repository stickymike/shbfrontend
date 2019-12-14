import React from "react";

import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import ItemSquare from "./ItemSquare";
import makeStyles from "@material-ui/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";
import ItemSquareStyleWrapper from "./ItemSquareStyleWrapper";

interface Props {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selected: boolean;
  key: number;
}

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
    boxSizing: "border-box"
  },
  labelSpan: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12,
    userSelect: "none",
    whiteSpace: "nowrap",
    cursor: "inherit"
  },
  chip: {
    borderRadius: "4px",
    backgroundColor: "rgba(0, 0, 0,0)",
    border: "1px solid rgba(0, 0, 0, 1)",
    width: "fit-content"
  },
  hover: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, .33)"
    }
  },
  test: {
    "& span": {
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  },
  isSelected: {
    background: theme.palette.primary.light
  }
}));

const AddRemoveField: React.FC<Props> = ({ label, onClick, selected }) => {
  const props = { color: "default", size: "small", onClick } as IconButtonProps;
  const { labelSpan, isSelected } = useStyles();

  return (
    <ItemSquareStyleWrapper selectedStyle={selected ? isSelected : undefined}>
      <span className={labelSpan}>{label}</span>
      <IconButton {...props} disabled={selected}>
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
      <IconButton {...props} disabled={!selected}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </ItemSquareStyleWrapper>
  );
};

export default AddRemoveField;
