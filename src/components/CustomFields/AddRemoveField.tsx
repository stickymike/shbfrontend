import React from "react";

import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import makeStyles from "@material-ui/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";
import ItemSquareStyleWrapper from "../ItemSquareStyleWrapper";

interface Props {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selected: boolean;
  key: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  labelSpan: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12,
    userSelect: "none",
    whiteSpace: "nowrap",
    cursor: "inherit"
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
