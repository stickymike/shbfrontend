import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import Chip, { ChipTypeMap, ChipProps } from "@material-ui/core/Chip";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

const useStyles = makeStyles(() => ({
  chip: {
    borderRadius: "4px",
    backgroundColor: "rgba(0, 0, 0,0)",
    border: "1px solid rgba(0, 0, 0, 1)",
    maxWidth: "100%"
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
  }
}));

const BlackChip: React.SFC<ChipProps> = ({ ...props }) => {
  const { hover, test, chip } = useStyles();
  return <Chip className={[hover, test, chip].join(" ")} {...props} />;
};

export default BlackChip;
