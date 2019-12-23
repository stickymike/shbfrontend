import React from "react";

import TableWrapper from "../../components/Table/TableWrapper";
import EnhancedTableHead, {
  headerCell
} from "../../components/Table/EnhancedTableHead";
import DerivedTableBody from "../../components/Table/DerivedTableBody";
import { useTimeRoleCtx } from "./TimeRolePage";

interface IProps {
  header: headerCell<any>[];
  data: any;
}

const TimeRoleTable: React.FC<IProps> = ({ header, data }) => {
  const [order, setOrder] = React.useState<false | "desc" | "asc">("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const dispatch = useTimeRoleCtx();

  const handleRequestSort = (event: any, property: any) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const openMenu = (
    e: React.MouseEvent<HTMLButtonElement>,
    user: any
  ): void => {
    const screen = e.currentTarget.getAttribute("data-value")
      ? (e.currentTarget.getAttribute("data-value") as string).toUpperCase()
      : "EDIT";
    dispatch({ type: "OPEN", payload: { user, screen } });
    e.stopPropagation();
  };

  return (
    <TableWrapper>
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
      />
    </TableWrapper>
  );
};

export default TimeRoleTable;
