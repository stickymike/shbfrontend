import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import { headerCell } from "./EnhancedTableHead";
import Chip from "@material-ui/core/Chip";

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

export interface ChipProps<M> {
  headerCell: headerCell<M>;
  openFunc: (e: React.MouseEvent<HTMLElement>, rowInfo: M) => void;
  rowInfo: M;
}

// React.FC<ICProps<morphData>> = ({
//   headerCell,
//   openFunc,
//   rowInfo,
//   ...props
// }) =>

const MyChip = <M,>({
  headerCell,
  openFunc,
  rowInfo,
  ...props
}: React.PropsWithChildren<ChipProps<M>>) => {
  const { hover, test, chip } = useStyles();
  return (
    <Chip
      className={[hover, test, chip].join(" ")}
      onClick={(e: any) => openFunc(e, rowInfo)}
      data-value={headerCell.id}
      label={rowInfo[headerCell.id as keyof M]}
      {...props}
    />
  );
};

export default MyChip;
