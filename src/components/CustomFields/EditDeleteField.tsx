import React, { useState } from "react";
import { Theme } from "@material-ui/core/styles";
import makeStyles from "@material-ui/styles/makeStyles";
import ItemSquareStyleWrapper from "../ItemSquareStyleWrapper";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

const useStyles = makeStyles((theme: Theme) => ({
  labelSpan: {
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12,
    userSelect: "none",
    whiteSpace: "nowrap",
    cursor: "inherit",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  hover: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, .33)"
    }
  },
  isSelected: {
    backgroundColor: `${theme.palette.secondary.light} !important`
  }
}));

interface Props {
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selected?: boolean;
  key: number;
  id: string;
}

const EditDeleteField: React.FC<Props> = ({
  label,
  onClick,
  selected,
  children,
  id
}) => {
  const [evilHover, setEvilHover] = useState(false);
  const props = { color: "default", size: "small", onClick } as IconButtonProps;
  const { labelSpan, isSelected } = useStyles();

  const evilProps = {
    onMouseEnter: () => setEvilHover(true),
    onMouseLeave: () => setEvilHover(false)
  };

  return (
    <ItemSquareStyleWrapper
      hover={true}
      selectedStyle={evilHover ? isSelected : undefined}
    >
      <Tooltip title="Edit" placement="top">
        <span className={labelSpan}>{children}</span>
      </Tooltip>
      <IconButton {...props} {...evilProps} data-id={id}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </ItemSquareStyleWrapper>
  );
};

export default EditDeleteField;
