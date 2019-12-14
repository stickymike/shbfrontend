import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import { Theme, IconButton } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { IconButtonProps } from "@material-ui/core/IconButton/IconButton";

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

interface Props {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selected: boolean;
  hover?: boolean;
  key: number;
}

const ItemSquare: React.FC<Props> = ({
  label,
  onClick,
  selected,
  hover,
  children
}) => {
  const {
    squareDiv,
    chip,
    labelSpan,
    isSelected,
    hover: hoverStyle
  } = useStyles();
  const props = { color: "default", size: "small", onClick } as IconButtonProps;

  return (
    <div
      className={[
        squareDiv,
        chip,
        selected ? isSelected : null,
        hover ? hoverStyle : null
      ].join(" ")}
    >
      {children}
      <span className={labelSpan}>{label}</span>
      <IconButton {...props} disabled={selected}>
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
      <IconButton {...props} disabled={!selected}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </div>
  );
};

export default ItemSquare;
