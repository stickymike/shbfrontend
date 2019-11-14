import React from "react";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  noRightPadding: {
    paddingRight: "0px"
  },
  noLeftPadding: {
    paddingLeft: "0px"
  }
}));

interface IProps {
  order: false | "desc" | "asc";
  orderBy: string;
  onRequestSort: (event: any, property: any) => void;
  header: any;
}

const EnhancedTableHead: React.FC<IProps> = ({
  order,
  orderBy,
  onRequestSort,
  header
}) => {
  const classes = useStyles();

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
            align={headCell.props && headCell.props.align}
            sortDirection={orderBy === headCell.id ? order : false}
            className={[
              header.length === i + 1 ? classes.noRightPadding : "",
              i === 0 ? classes.noLeftPadding : ""
            ].join(" ")}
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
