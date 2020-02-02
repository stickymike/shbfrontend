import React from "react";
import { headerCell } from "./EnhancedTableHead";
import { TRTableData } from "../../pages/TimeRequest/Components/TRTableLoader";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
interface Props<M> {
  headerCell: headerCell<M>;
  openFunc: (e: React.MouseEvent<HTMLElement>, rowInfo: M) => void;
  rowInfo: M;
}

const BoolCell: React.FC<Props<TRTableData>> = ({
  headerCell,
  openFunc,
  rowInfo
}) => {
  return rowInfo[headerCell.id as keyof TRTableData] ? (
    <CheckCircleIcon />
  ) : (
    <ArrowRightAltIcon />
  );
};

export default BoolCell;
