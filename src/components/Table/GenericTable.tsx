import React from "react";

import TableWrapper from "./TableWrapper";
import EnhancedTableHead, { headerCell } from "./EnhancedTableHead";
import DerivedTableBody from "./DerivedTableBody";

export interface TableProps<G> {
  header: headerCell<G>[];
  data: G[];
  setScreenwithPayload: (arg: string, arg1: G) => void;
  tableWrapperStyles?: React.CSSProperties;
  messageNoEntries?: string;
}

// export interface TableProps2<G> {
//   // header: headerCell<G>[];
//   // data: G[];
//   // setScreenwithPayload: (arg: string, arg1: G) => void;
//   tableWrapperStyles?: React.CSSProperties;
//   messageNoEntries?: string;
// }

const GenericTable = <G,>({
  header,
  data,
  setScreenwithPayload,
  tableWrapperStyles,
  messageNoEntries
}: React.PropsWithChildren<TableProps<G>>) => {
  const [order, setOrder] = React.useState<false | "desc" | "asc">("asc");
  const [orderBy, setOrderBy] = React.useState("");

  const handleRequestSort = (event: any, property: any) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const openMenu = (
    e: React.MouseEvent<HTMLButtonElement>,
    payload: any
  ): void => {
    const screen = e.currentTarget.getAttribute("data-value")
      ? (e.currentTarget.getAttribute("data-value") as string).toUpperCase()
      : "EDIT";
    setScreenwithPayload(screen, payload);
    e.stopPropagation();
  };

  return (
    <TableWrapper style={tableWrapperStyles}>
      <EnhancedTableHead
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        header={header}
      />
      <DerivedTableBody
        order={order}
        orderBy={orderBy}
        data={data}
        header={header}
        openMenu={openMenu}
        messageNoEntries={messageNoEntries}
      />
    </TableWrapper>
  );
};

export default GenericTable;
