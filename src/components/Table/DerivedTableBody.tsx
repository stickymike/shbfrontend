import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { headerCell } from "./EnhancedTableHead";

interface Props<M> {
  order: false | "desc" | "asc";
  orderBy: string;
  data: M[];
  header: headerCell<M>[];
  openMenu?: any;
  messageNoEntries?: string;
}

const defaultMsg = "No records to display";

const DerivedTableBody = <M,>({
  order,
  orderBy,
  data,
  header,
  children,
  openMenu = false,
  messageNoEntries = defaultMsg
}: React.PropsWithChildren<Props<M>>) => {
  return (
    <TableBody>
      {data.length === 0 && (
        <NoEnteriesRow
          messageNoEntries={messageNoEntries}
          colSpan={header.length}
        />
      )}
      {stableSort(data, getSorting(order, orderBy)).map((row: any) => (
        <TableRow
          key={row.id}
          hover={!!openMenu}
          onClick={(e: any) => (openMenu ? openMenu(e, row) : undefined)}
          style={!!openMenu ? { cursor: "pointer" } : undefined}
        >
          {header.map(info => {
            const { renderComp: RenderEle } = info;
            return (
              <TableCell key={`${info.id}-1`} {...info.cellProps}>
                {RenderEle ? (
                  <RenderEle
                    headerCell={info}
                    openFunc={openMenu}
                    rowInfo={row}
                  />
                ) : (
                  row[info.id]
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
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

const NoEnteriesRow: React.FC<{
  messageNoEntries: string;
  colSpan: number;
}> = ({ messageNoEntries, colSpan }) => (
  <TableRow>
    <TableCell colSpan={colSpan} style={{ textAlign: "center" }}>
      {messageNoEntries}
    </TableCell>
  </TableRow>
);

export default DerivedTableBody;
