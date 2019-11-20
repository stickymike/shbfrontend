import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Chip, makeStyles } from "@material-ui/core";

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
    // "& :hover": {
    //   backgroundColor: "rgba(0, 0, 0, .33)",
    //   cursor: "pointer"
    // }
  }
}));

interface Props {
  order: false | "desc" | "asc";
  orderBy: string;
  data: any;
  header: any;
  openMenu?: any;
}

const DerivedTableBody: React.FC<Props> = ({
  order,
  orderBy,
  data,
  header,
  children,
  openMenu = false
}) => {
  const { hover, test, chip } = useStyles();
  return (
    <TableBody>
      {stableSort(data, getSorting(order, orderBy)).map(
        (row: any, index: number) => (
          <TableRow
            key={row.id}
            hover={!!openMenu}
            onClick={(e: any) => openMenu(e, row)}
          >
            {header.map((info: any, index: number) => (
              <TableCell key={`${info.id}-1`} {...info.props}>
                {info.optout ? (
                  <Chip
                    label={row[info.id]}
                    className={[hover, test, chip].join(" ")}
                  />
                ) : (
                  row[info.id]
                )}
              </TableCell>
            ))}
          </TableRow>
        )
      )}
      {children}
    </TableBody>
  );
};

function desc(a: any, b: any, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array: {}[], cmp: any): any {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order: any, orderBy: any) {
  return order === "desc"
    ? (a: any, b: any) => desc(a, b, orderBy)
    : (a: any, b: any) => -desc(a, b, orderBy);
}

export default DerivedTableBody;
