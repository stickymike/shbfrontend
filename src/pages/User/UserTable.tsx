import React from "react";

import TableWrapper from "../../components/Table/TableWrapper";
import EnhancedTableHead from "../../components/Table/EnhancedTableHead";
import DerivedTableBody from "../../components/Table/DerivedTableBody";

interface IProps {
  header: any;
  data: any;
  openMenu: any;
}

const UserTable: React.FC<IProps> = ({ header, data, openMenu }) => {
  const [order, setOrder] = React.useState<false | "desc" | "asc">("asc");
  const [orderBy, setOrderBy] = React.useState("");

  const handleRequestSort = (event: any, property: any) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
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

export default UserTable;
