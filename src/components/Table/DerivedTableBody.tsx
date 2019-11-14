import React, { useRef } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  test: {
    "& span": {
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  },
  hover: {
    "& :hover": {
      backgroundColor: "rgba(0, 0, 0, .33)",
      cursor: "pointer"
    }
  }
}));

interface Props {
  order: false | "desc" | "asc";
  orderBy: string;
  data: any;
  header: any;
}

const DerivedTableBody: React.FC<Props> = ({
  order,
  orderBy,
  data,
  header,
  children
}) => {
  const { hover, test } = useStyles();
  const myRef = useRef<HTMLDivElement>(null);
  console.dir(myRef.current);
  return (
    <TableBody>
      {stableSort(data, getSorting(order, orderBy)).map(
        (row: any, index: number) => (
          <TableRow key={row.id}>
            {header.map((info: any, index: number) => (
              <TableCell key={`${info.id}-1`} {...info.props}>
                {info.optout ? (
                  <Chip
                    style={{
                      borderRadius: "4px",
                      backgroundColor: "rgba(0, 0, 0,0)",
                      border: "1px solid rgba(0, 0, 0, 1)",
                      maxWidth: "100%"
                      // maxWidth: "-webkit-fill-available"
                    }}
                    label={row[info.id]}
                    className={[hover, test].join(" ")}
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
