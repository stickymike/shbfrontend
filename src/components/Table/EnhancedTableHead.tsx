import React from "react";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell, { TableCellProps } from "@material-ui/core/TableCell";
import { ICProps } from "./MyChip";

interface IProps {
  order: false | "desc" | "asc";
  orderBy: string;
  onRequestSort: (event: any, property: any) => void;
  header: any;
}

export interface headerCell<M> {
  id: string;
  label: string;
  cellProps?: TableCellProps;
  orderBy?: string;
  renderComp?: React.FC<ICProps<M>>;
}

const EnhancedTableHead: React.FC<IProps> = ({
  order,
  orderBy,
  onRequestSort,
  header
}) => {
  const createSortHandler = (cell: any) => (event: any) => {
    if (cell.orderBy) onRequestSort(event, cell.orderBy);
    else onRequestSort(event, cell.id);
  };
  if (!header) return null;
  return (
    <TableHead>
      <TableRow>
        {header.map((headCell: any, i: any) => (
          <TableCell
            key={headCell.id}
            align={headCell.cellProps && headCell.cellProps.align}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ paddingTop: "0px" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id || orderBy === headCell.orderBy}
              direction={!order ? undefined : order}
              onClick={createSortHandler(headCell)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default EnhancedTableHead;
